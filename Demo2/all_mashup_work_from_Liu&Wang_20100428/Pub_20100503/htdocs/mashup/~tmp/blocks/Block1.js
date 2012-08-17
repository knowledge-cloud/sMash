function (svc) {

	var oDisplay;
	var map;

	var veURI = 'http://dev.ditu.live.com/mapcontrol/mapcontrol.ashx?v=6.1';

	this.initialize = function() {
		
		var jDisplay = $('#' + svc.displayId);
		jDisplay.append('<div id="_mapView" style="width: 100%; height: 100%; position: relative;"></div>');
		
		var eMap = $('#_mapView').context;

		$.getScript(veURI, delayed (function (event) {
			
			var i = 0;
			var n = 15;
			
			var h = setInterval(function () {
				if (window.VEMap !== undefined && eMap.attachEvent !== undefined) {
					clearInterval(h);
					map = new VEMap('_mapView');
					map.LoadMap();

					svc.notifyInitializationCompleted();
				}
				else {
					i++;
					
					if (i >= n) {
						alert('Failed to load Virtual Earth');
						clearInterval(h);
					}
					
				}
			}, 1000);

		}));
	};
	
	var addPushpin = function (latitude, longitude, pushpin, description, title, url) {
		var latLong = new VELatLong (latitude - 0.2 + 0.4 * Math.random(), longitude - 0.2 + 0.4 * Math.random());
		var pin = new VEShape(VEShapeType.Pushpin, latLong);
		pin.SetDescription (description);
		pin.SetCustomIcon (pushpin);
		pin.SetTitle (title);
		
		if (typeof url === 'string' && url !== '') {
			pin.SetMoreInfoURL(url);
			pin.SetPhotoURL(url);
		}
		map.AddShape (pin);
	};

	var queue = [];
	var queue_pos = 0;
	var handling = false;

	var handler = function f() {
		var record = queue[queue_pos++];
		map.SetCenterAndZoom(new VELatLong(record.latitude, record.longitude), record.zoomLevel);
		
		if (queue_pos < queue.length) {
			setTimeout(f, 50);
		}
		else {
			handling = false;
		}
	};



	this.beginUpdateInputs = function(newInputs) {

		if (newInputs.pushpin) {
			var source = svc.inputs.pushpin;
	
			var latitude;
			var longitude;
			var icon;
			var description;
			var title;
			//alert(source.length);
			for (var s in source) {
				latitude = source[s].latitude;
				longitude = source[s].longitude;
				icon = source[s].image;
				description = source[s].description;
				title = source[s].title;
				url = source[s].url;
				addPushpin(latitude, longitude, icon, description, title);
			}
		}
		if (newInputs.position && newInputs.position[0]) {

			var position = newInputs.position[0];
			
			
			//alert(position.latitude + ',' + position.longitude + ':' + position.zoomLevel);
			queue.push($.extend({}, position));

			if (map && map.SetCenterAndZoom && !handling) {
				handling = true;
				handler();
			}
			
		}

		svc.notifyInputsChanged(newInputs);
	};


	this.beginOutput = function() {
	    svc.notifyOutputReady();
	};

}
