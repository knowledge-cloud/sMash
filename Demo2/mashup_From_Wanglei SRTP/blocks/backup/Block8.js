function(svc) {

	var oDisplay;
	var map;


	this.initialize = function() {
		alert('i\'m shooting...');
		oDisplay = document.getElementById(svc.displayId);

		var oMapView = document.createElement('div');
		oMapView.id = '_mapView';
		oMapView.style.width = '100%';
		oMapView.style.height = '100%';
		//oMapView.onload = handler;
		oDisplay.appendChild(oMapView);
		//document.getElementById('_mapView').o = handler;


		var oHead = document.getElementsByTagName('head').item(0);
		var oVEScript = document.createElement('script');
		var satisfiedConditions = 0;

		var handler = function (event) {
			alert('in handler');
			
			if (++satisfiedConditions < 1) {
				return;
			}

			map = new VEMap('_mapView');
			map.LoadMap();

			svc.notifyInitializationCompleted();
		};

		oVEScript.type = 'text/javascript';
		oVEScript.src = 'http://dev.ditu.live.com/mapcontrol/mapcontrol.ashx?v=6.1';
		oVEScript.id =  '_vescript';
		

		if (oDisplay.readyState) {
			oVEScript.onreadystatechange = function (event) {
				if (oVEScript.readyState == 4 || oVEScript.readyState == 'complete' || oVEScript.readyState == 'loaded') {
					alert('for ie fix');
					handler.call(oVEScript, event);
				}
			};
		}
		else
			oVEScript.onload = handler;

		oHead.appendChild(oVEScript);


		alert('written');

	};
		


	this.beginUpdateInputs = function(newInputs) {
		svc.notifyInputsChanged(newInputs);
	};


	this.beginOutput = function() {
		svc.output = svc.inputs.list;
		svc.notifyOutputReady();
	};

}