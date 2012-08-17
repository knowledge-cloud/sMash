function(svc) {

	var oDisplay;
	var map;


	this.initialize = function() {
		alert('i\'m shooting...');
		oDisplay = document.getElementById(svc.displayId);

		var oHead = document.getElementsByTagName('head').item(0);
		var tmp = document.createElement('script');

		tmp.type = 'text/javascript';
		tmp.src = '../native2.js';
		tmp.id = svc.blockId + '_vescript';

		var handler = function(event) {
			alert(event);
			/*if (event.srcElement.readyState != 'complete')
				return;
	
			alert(document.getElementById('display'));
	
			alert('script loaded : ' + window.event.srcElement.readyState);
			map = new VEMap('display');
			map.LoadMap();
			*/
			svc.notifyInitializationCompleted();
		};

		//if (window.event) {
			//oScript.onreadystate = handler;
		//}
		//else {
			oScript.onload = handler;			
		//}

		oHead.appendChild(oScript);

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