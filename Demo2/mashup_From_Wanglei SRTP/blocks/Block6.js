function (svc) {
    var googleHome = 'http://www.google.com/ig/api?hl=zh-cn&weather=,,,';
    var weathers = [];

    var weatherReport = function(latitude, longitude) {
        var queryString = googleHome + latitude * 1000000 + ',' + longitude * 1000000;
        var xmlDoc = loadXML(queryString);
        var currentWeather = xmlDoc.selectSingleNode('/xml_api_reply/weather/current_conditions');
	if (!currentWeather)
		return;
        var condition = currentWeather.selectSingleNode('condition').getAttribute('data');
        var image = 'http://www.google.com' + currentWeather.selectSingleNode('icon').getAttribute('data');
        var temp_c = currentWeather.selectSingleNode('temp_c').getAttribute('data') + '摄氏度\n';
        var wind_condition = currentWeather.selectSingleNode('wind_condition').getAttribute('data');
        var humidity = currentWeather.selectSingleNode('humidity').getAttribute('data');
        var description = condition + '<br />' + temp_c + '<br />' + humidity + '<br />' + wind_condition;

        var weather = { latitude: latitude, longitude: longitude, title: 'Weather Report', image: image, description: description };
        weathers.push(weather);
    }
    
    loadXML = function(xmlFile) {
        var xmlDoc;
        if(window.ActiveXObject) {
            xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
            xmlDoc.async = false;
            xmlDoc.load(xmlFile);
        } else if (document.implementation&&document.implementation.createDocument){
            xmlDoc     = document.implementation.createDocument('', '', null);
            xmlDoc.load(xmlFile);
        } else {
            return null;
        }
        
        return xmlDoc;
    }
    
    this.initialize = function () {
        svc.notifyInitializationCompleted();
    };
    
    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };

    this.beginOutput = function() {
        var locations = svc.inputs.locations;
        for (var key in locations) {
            weatherReport(locations[key].latitude, locations[key].longitude);
        }
        svc.output = weathers;
        svc.notifyOutputReady();
    };
}