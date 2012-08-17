function(svc) {

	var oDisplay;
	var map;


	this.initialize = function() {
		alert('i\'m shooting...');
		oDisplay = document.getElementById(svc.displayId);

		var oHead = document.getElementsByTagName('head').item(0);
		var oVEScript = document.createElement('script');
		
		var satisfiedConditions = 0;

		var handler = function (event) {
			alert('in handler');
			
			if (++satisfiedConditions < 2) {
				return;
			}
			
			/*if (event.srcElement.readyState != 'complete')
				return;
	
			alert(document.getElementById('display'));
	
			alert('script loaded : ' + window.event.srcElement.readyState);
			map = new VEMap('display');
			map.LoadMap();
			*/
			svc.notifyInitializationCompleted();
		};

		oVEScript.type = 'text/javascript';
		oVEScript.src = '../native2.js';
		oVEScript.id = svc.blockId + '_vescript';
		oVEScript.onload = handler;
		oHead.appendChild(oVEScript);

		
		var oMapView = document.createElement('div');
		oMapView.id = svc.blockId + '_mapView';
		oMapView.onload = handler;

		oHead.appendChild(oMapView);

		
		

		//if (window.event) {
			//oScript.onreadystate = handler;
		//}
		//else {
			//oScript.onload = handler;			
		//}


		alert('written');



/*
		document.write('<script id="tmp" src="http://dev.ditu.live.com/mapcontrol/mapcontrol.ashx?v=6.1"><\/script><div id="mapView"></div>');
		document.getElementById('tmp').onreadystatechange = function() {

		if (window.event.srcElement.readyState != 'complete')
			return;

		alert(document.getElementById('display'));

		alert('script loaded : ' + window.event.srcElement.readyState);
		map = new VEMap('display');
		map.LoadMap();

		svc.notifyInitializationCompleted();
*/
	};
		


	this.beginUpdateInputs = function(newInputs) {
		svc.notifyInputsChanged(newInputs);
	};


	this.beginOutput = function() {
		svc.output = svc.inputs.list;
		svc.notifyOutputReady();
	};

}