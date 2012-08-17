function (svc) {
    
	
    this.initialize = function () {
		svc.notifyInitializationCompleted();
    };
    
    this.beginUpdateInputs = function(newInputs) {
        var records = $.extend(true, [], svc.inputs.locations);
		//alert('Locate : ' + JSON.stringify(records));

		$.each(records, parse);

        svc.notifyInputsChanged(newInputs);
    };

    var parse = function (key, record) {

		if (record.latitude !== undefined) {
			svc.output = [record];
			svc.notifyOutputReady();
			svc.output = [];
			return;
		}
		
		var geocoderURI = mapUri(
			'http://maps.google.com/maps/api/geocode/json?region=CN&sensor=false&address=' +
			encodeURIComponent(record.addr));

		$.get(geocoderURI, null, function (obj) {
			
			if (!obj || obj.status !== 'OK') {
				record.latitude = Math.round((20 + 24 * Math.random()) * 100) / 100;
				record.longitude = Math.round((96 + 24 * Math.random()) * 100) / 100;
				record.cityName += ' (Not Found)';
			}
			else {
				record.latitude = obj.results[0].geometry.location.lat;
				record.longitude = obj.results[0].geometry.location.lng;
			}
	
			//alert(record.description);
			if (typeof record.description !== 'string' || record.description === '') {
				record.description = record.addr;
			}
			else {
				record.description = record.addr + '\r\n\r\n' + record.description;
			}
	
			svc.output = [record];
			svc.notifyOutputReady();
			svc.output = [];
	
		}, 'json');
		
    }



    this.beginOutput = function() {
        
    };
}
