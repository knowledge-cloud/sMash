var MPIMapping = new ActiveXObject("Scripting.Dictionary");

function callTileService(mpi)
{
	var tileName = mpi.tpName+"Class";
	var operName = mpi.operName;
	var inputArr = new Array();
	makeInputArr(inputArr, mpi);
	MPIMapping.add(mpi.tpName+"."+operName, doCallTS(tileName, operName, inputArr));
	
}

function startLoadTileData(mpiStr)
{
	var mpiArr = new Array();
	parseMPIStr(mpiArr, mpiStr);
    var i;
    var hasMapping = false;
    for(i = 0; i < mpiArr.length; i++){
    	var tpName = mpiArr[i].tpName;
    	if(tpName == "UserInput")
    		continue;
    	var jsSrc = tpName + ".js";
      //  environment.addExternalScript(jsSrc);
      	try{
      	//	debugger;
	        callTileService(mpiArr[i]);
	        if(mpiArr[i].tpName == "VirtualEarth")
	        	hasMapping = true;
      	}	
      	catch(err){
			window.alert("load data error from " + mpiArr[i].tpName + "\r\n  please try again~~");
			window.close();
			break;
		}
    }
    var pageload = document.getElementById('page_load');
    pageload.style.display = "none";
    if(!hasMapping){
	    for(i = 0; i < mpiArr.length; i++){
	    	if(mpiArr[i].type == "leaf"){
	    		try{
		    		var result = MPIMapping.Item(mpiArr[i].tpName+"."+mpiArr[i].operName);
			    	var j = 0;
			    	for(j = 0; j < result.length; j++){
			    		environment.output(result[j]);
		    		}
		    	}
		    	catch(exception){
		    		break;
		    	}
	    	}
	    }
    }
}

function parseMPIStr(mpiArr2, mpiStr)
{
	var mpiStrArr = mpiStr.split("    ");
	var i;
	
	for(i = 0; i < mpiStrArr.length; i++){
		var obj = new Object();
		var mpiItem = mpiStrArr[i].substring(1, mpiStrArr[i].length - 1);
		var eleArr = mpiItem.split("  ,  ");
		var j;
		if(eleArr.length != 6)
			window.alert("mpiStr error");
		obj.tpName = eleArr[0].substr(eleArr[0].indexOf(":") + 1);
		obj.operName = eleArr[1].substr(eleArr[1].indexOf(":") + 1);
		obj.type = eleArr[2].substr(eleArr[2].indexOf(":") + 1);
		var tmpInputStr = eleArr[3].substr(eleArr[3].indexOf(":") + 1);
		var inputStr = tmpInputStr.substring(1, tmpInputStr.length - 1);
		var inputStrItemArr = inputStr.split("+++");
		var inputArr = new Array();
		for(j = 0; j < inputStrItemArr.length; j++){
			var inputObj = new Object();
			var inputSI = inputStrItemArr[j].substring(1, inputStrItemArr[j].length - 1);
			var sIndex = inputSI.indexOf(" ");
			inputObj.paraName = inputSI.substring(0, sIndex);
			inputObj.paraValue = inputSI.substring(sIndex + 1, inputSI.length);
			inputArr.push(inputObj);
		}
		obj.input = inputArr;
		obj.output = getParam(eleArr[4]);
		obj.parents = getParam(eleArr[5]);
		mpiArr2.push(obj);
	}
}

function getParam(eleArr)
{
	var tmpStr = eleArr.substr(eleArr.indexOf(":") + 1);
	var str = tmpStr.substring(1, tmpStr.length - 1);
	var i;
	var paraArr = str.split("+++");
	
	return paraArr;
}

function doCallTS(tileName, operName, inputArr)
{
	var i, j;
	var tileClass = eval("new " + tileName+"()");
	var resultArr = new Array();
	if(tileName == "VirtualEarthClass"){
		eval("tileClass.initialize()");
	}
	var oper = "";
	if(inputArr.length == 0){
	//	debugger;
		oper = "tileClass." + operName + "()";
		resultArr.push(eval(oper));
	}
	else{
		for(i = 0; i < inputArr.length; i++){
			var inputItem = inputArr[i];
			oper = "tileClass." + operName + "(";
			for(j = 0; j < inputItem.length; j++){
				oper = oper + "'" + environment.removeQuotesAndBr(inputItem[j].paraValue) + "'";
				if(j != inputItem.length - 1) 
					oper += ",";
			}
			oper += ")";
		//	try{
			resultArr.push(eval(oper));
		//	}
		//	catch(exception){
				//alert(exception);
		//	}
		}
	}
	
	return resultArr;
}

function makeInputArr(inputArr, mpi)
{
	var i, j;
	var inputItem = new Array();
	var input = mpi.input;
	var type = mpi.type;
	var parents = mpi.parents;	
	
//	window.alert('makeInputArr');
	if(type == "root"){
		inputArr.push(input);
	}
	else
		for(i = 0; i < parents.length; i++){
			var tileSource = parents[i];
			if(!MPIMapping.Exists(tileSource))
				window.alert("tile service call error in " + mpi.tpName);
			else{
				var result = MPIMapping.Item(tileSource);
				setParamValue(tileSource, result, input, inputArr);
			}
		}
}

function doSetPV(ts, result, input, inputArr)
{
	var j, k, m;
	
	for(j = 0; j < result.length; j++){
		var inputItem = new Array();
		for(k = 0; k < input.length; k++){
			var obj = new Object();
			var paraName = input[k].paraName;
			var paraValue = input[k].paraValue;	
			obj.paraName = paraName;
			if(paraValue.charAt(0) == '{' && paraValue.charAt(paraValue.length - 1) == '}'){
				var subStr = paraValue.substring(1, paraValue.length - 1);
				var tsItem = subStr.split(",");	
				for(m = 0; m < tsItem.length; m++){
					var tmpIndex = tsItem[m].lastIndexOf(".");
					var s1 = tsItem[m].substr(0, tmpIndex);
					var s2 = tsItem[m].substr(tmpIndex + 1, tsItem[m].length);
					if(s1 == ts){
						obj.paraValue = getParamItemValue(result[j], s2);
						break;
					}
				}
			}
			else
				obj.paraValue = paraValue;
			inputItem.push(obj);	
		}
		inputArr.push(inputItem);			
	}		
}
	
function setParamValue(ts, result, input, inputArr)
{	
	var k, j, m;
	
	for(j = 0; j < result.length; j++){
		if(result[j] instanceof Array)
			doSetPV(ts, result[j], input, inputArr);
		else{
			var tmpR = new Array();
			tmpR.push(result[j]);
			doSetPV(ts, tmpR, input, inputArr);
		}
	}
}

function getParamItemValue(resultItem, paraName)
{
	var s = 'resultItem.'+paraName;
	var r = eval(s);
	
	if(typeof r == "undefined")
		return resultItem;
	else
		return r;	
}
	