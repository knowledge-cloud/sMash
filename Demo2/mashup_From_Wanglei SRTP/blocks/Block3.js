function (svc) {
    var googleHome = "http://www.google.com/ig/cities?output=xml&hl=en&country=";
    
    var citiesList = [];
    var makeCitiesList = function (country) {
        var queryString = googleHome + country;
        var xmlDoc = loadXML (queryString);            
        var cities = xmlDoc.selectSingleNode ('/xml_api_reply/cities');
        
        var cityName;
        var latitude;
        var longitude;
        for (i = 0; i < cities.childNodes.length; i++) {
            cityName = cities.childNodes[i].selectSingleNode ('name').getAttribute ('data');
            latitude = cities.childNodes[i].selectSingleNode ('latitude_e6').getAttribute ('data');
            longitude = cities.childNodes[i].selectSingleNode ('longitude_e6').getAttribute ('data');
            
            citiesList.push ({cityName : cityName,
                              latitude : latitude / 1000000,
                              longitude: longitude / 1000000});
        }
    };
    
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

    this.initialize = function() {
        makeCitiesList('au');
        svc.notifyInitializationCompleted();
    };
    
    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };

    this.beginOutput = function() {
        svc.output = citiesList;
        svc.notifyOutputReady();
    };
}