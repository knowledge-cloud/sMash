function (svc) {
    var googleHome = 'http://www.google.com/ig/api?hl=zh-cn&weather=';
    var weathers = [];

    var weatherReport = function(key, srcRecord) {
		var cityName = srcRecord.addr;
		var latitude = srcRecord.latitude;
		var longitude = srcRecord.longitude;
		
		
		if (cityName == 'Urumqi')
			cityName = 'wulumuqi';
		
		var queryString = googleHome + cityName;
		queryString = 'http://www.google.com/ig/api?hl=zh-cn&weather=,,,' + latitude * 1000000 + ',' + longitude * 1000000;

		var xmlReq = new XMLHttpRequest ();
		xmlReq.onreadystatechange = function () {
			if (xmlReq.readyState != 4) {
				return;
			}
			
			var xmlDoc = xmlReq.responseXML;
			if (!xmlDoc || !xmlDoc.childNodes[0] || !xmlDoc.childNodes[0].childNodes[0] || !xmlDoc.childNodes[0].childNodes[0].childNodes[1]) {
				svc.output = [$.extend(true, {}, srcRecord)];
				svc.notifyOutputReady();
				svc.output = [];
				return;
			}
			var currentWeather = xmlDoc.childNodes[0].childNodes[0].childNodes[1];
			if (!currentWeather)
				return;
			var condition = currentWeather.childNodes[0].getAttribute('data');
			var image = 'http://www.google.com' + currentWeather.childNodes[4].getAttribute('data');
			var temp_c = currentWeather.childNodes[2].getAttribute('data') + '摄氏度';
			var wind_condition = currentWeather.childNodes[5].getAttribute('data');
			var humidity = currentWeather.childNodes[3].getAttribute('data');

			var description = xhtml(condition + '\r\n' + temp_c + '\r\n' + humidity + '\r\n' + wind_condition);
			
			var record = $.extend(true, {}, srcRecord);
			
			if (typeof record.description === 'string' && record.description !== '') {
				record.description = description + '\r\n\r\n' + record.description;
			}
			else {
				record.description = description;
			}
			
			if (typeof record.title !== 'string' || record.description === '') {
				record.title = cityName;
			}

			record.image = image;

			svc.output = [record];
			svc.notifyOutputReady();
			svc.output = [];
		}
		xmlReq.open ("GET", mapUri (queryString));
		xmlReq.send (null);
    }
    
    // loadXML = function(xmlFile) {
        // var xmlDoc;
        // if(window.ActiveXObject) {
            // xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
            // xmlDoc.async = false;
            // xmlDoc.load(xmlFile);
        // } else if (document.implementation&&document.implementation.createDocument){
            // xmlDoc     = document.implementation.createDocument('', '', null);
            // xmlDoc.load(xmlFile);
        // } else {
            // return null;
        // }
        
        // return xmlDoc;
    // }
    
    this.initialize = function () {
        svc.notifyInitializationCompleted();
    };
    
    this.beginUpdateInputs = function(newInputs) {
        var locations = svc.inputs.locations;
		
		$.each (locations, weatherReport);
		
        svc.notifyInputsChanged(newInputs);
    };

    this.beginOutput = function() {
    };
}
