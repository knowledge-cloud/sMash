function (svc) {



	var queue;
	var maxSteps = 50;
	var interval = 50;
	
	var zoomLevel = 6;
	var id;
	var prev = {latitude: 30, longitude: 120, zoomLevel: zoomLevel};
	var steps = null;
	var next = null;
	

	var h;
	var handler = function () {
		
		if (steps === null) {
			steps = 0;
			next = queue[id];
			delete queue[id];
		}


		steps++;
		var ratio = steps / maxSteps;
		/*ratio = 2 * ratio - 1;
		ratio = (ratio < 0 ? -1 : 1) * Math.pow(Math.abs(ratio), 1 / 3);
		ratio = ratio / 2 + 0.5;*/

		var lat = prev.latitude * (1 - ratio) + next.latitude * ratio;
		var lng = prev.longitude * (1 - ratio) + next.longitude * ratio;

		//alert(id + ':' + steps + ':' + lat + ',' + lng);

		if (maxSteps === steps) {
			id++;
			steps = null;
			
			prev = next;
			next = null;
			
			if (queue[id] === undefined) {
				clearInterval(h);
			}
		}

		svc.output = [{latitude : lat, longitude : lng, zoomLevel : zoomLevel}];
		svc.notifyOutputReady();
		svc.output = [];

	};
	

	this.initialize = function() {
		id = 0;
		queue = [];
		
		setTimeout(function () {
			svc.notifyInitializationCompleted();
			
			svc.output = [prev];
			svc.notifyOutputReady();
			svc.output = [];
			
		}, 2000);
	};
	
	
	this.beginUpdateInputs = function(newInputs) {

		$.each (newInputs.positions, function (key, srcRecord) {
			
			if (srcRecord.latitude === undefined) {
				return;
			}
			
			queue.push({latitude : srcRecord.latitude, longitude : srcRecord.longitude});

			if (queue.length === 1) {
				h = setInterval(handler, interval);
			}

		});

		svc.notifyInputsChanged(newInputs);
	};


	this.beginOutput = function() {
	    svc.notifyOutputReady();
	};

}
