function (svc) {
    var googleHome = 'http://www.google.com/ig/api?weather=,,,';
    var weathers = [];
    
    var weatherReport = function (latitude, longitude) {
        var queryString = googleHome + latitude * 1000000 + ',' + longitude * 1000000;
        var xmlDoc = loadXML (queryString);
        var reports = xmlDoc.selectSingleNode ('/xml_api_reply/weather');
        var currentWeather = reports.childNodes[1];
        var condition = currentWeather.selectSingleNode ('condition').getAttribute ('data');
        var image = 'http://www.google.com' + currentWeather.selectSingleNode ('icon').getAttribute ('data');
        var temp_c = currentWeather.selectSingleNode ('temp_c').getAttribute('data') + 'degree';
        var wind_condition = currentWeather.selectSingleNode ('wind_condition').getAttribute ('data');
        var humidity = currentWeather.selectSingleNode ('humidity').getAttribute ('data');
        var description = condition + '\n' + temp_c + '\n' + humidity + '\n' + wind_condition;
        
        var weather = {latitude : latitude, longitude : longitude, title : 'Weather Report', image : image, description : description};
        weathers.push (weather);
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
        for (var location in locations) {
            weatherReport (locations[location].latitude, locations[location].longitude);
        }
        svc.output = weathers;
        svc.notifyOutputReady();
    };
}
