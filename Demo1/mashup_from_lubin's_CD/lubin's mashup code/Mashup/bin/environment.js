
environment = {
    getRequest : function(url, key, headers, data)
    {   
		
        var url = "http://" + document.location.host + "/mashup/requestProcessor?req=" + escape(url);
        var xmlhttp = new window.XMLHttpRequest();

        if(data && data.length > 0)
        {
            xmlhttp.open('POST', url, false); 
        }
        else
        {
            xmlhttp.open('GET', url, false);
        }

	    if(headers && headers.length > 0)
	    {
	        for(var i = 0; i < headers.length; i++)
	        {
	            if(headers[i] && headers[i].Key && headers[i].Value)
	            {
	                xmlhttp.setRequestHeader(headers[i].Key, headers[i].Value);
	            }
	        }
	    }
      	
        if(data && data.length > 0)
        {
            xmlhttp.send(data);
        }
        else
        {
            xmlhttp.send(null);
        }

        if(xmlhttp.readyState == 4 && xmlhttp.status == "200")
        {
            return xmlhttp;
        }
        else
        {
            throw "Unable to get data from '" + url + "': Error code " + xmlhttp.status;
        }
    },

    getXml : function(url, key, headers, data)
    {
        return environment.getRequest(url, key, headers, data).responseXML;
    },

    getText : function(url, key, headers, data)
    {
        return environment.getRequest(url, key, headers, data).responseText;
    },

    output : function(outputHTML)
    {
        var divOut = document.getElementById('divOutput');
        divOut.innerHTML  = outputHTML;
    },
    
    addExternalScript : function(jsSrc)
    {
    	var divJSLib = document.getElementById('jsLib');
    	//var src = "<script language=\"JavaScript\" type=\"text/javascript\" src=\"" + jsSrc +"\"></script>";
    	var src = "<script language='JavaScript' type='text/javascript' src='" + jsSrc +"'></script>";
    	divJSLib.innerHTML =  divJSLib.innerHTML + src ;
   // 	document.close();
    //	return;
    },

	escapeQuotes : function(str)
	{
		var s = '\"';
		return str.replace(/"/g, s);	
	},
	
    visualize : function(obj)
    {
        if(obj instanceof Array)
        {
            for(var i = 0; i < obj.length; i++)
            {
               environment.visualize(obj[i]); 
            }
        }
        
        // each object gets it's own table.
        var htmlOut = "";
        
        htmlOut += "<table>";
        // header row
        htmlOut += "<tr>";
        // property name
        htmlOut += "<td><strong>Property</strong></td>";        
        // property value
        htmlOut += "<td><strong>Value</strong></td>";
        htmlOut += "</tr>";
        
        // and each property has it's own row
        
        for(name in obj)
        {
            htmlOut += "<tr>";
            // property name
            htmlOut += "<td>"+name+"</td>";        
            // property value
            htmlOut += "<td>"+obj[name]+"</td>";
            htmlOut += "</tr>";
        }
        
        htmlOut += "</table>";
        
        var divOut = document.getElementById('divOutput');
        divOut.innerHTML  += htmlOut;
    }
}