function (svc) {
    var googleHome = "http://www.google.com/ig/cities?output=xml&hl=en-us&country=";

    var citiesList = [];
    var makeCitiesList = function (country) {
        var queryString = googleHome + country;
		var xmlReq = new XMLHttpRequest ();
		xmlReq.onreadystatechange = function () {
			if (xmlReq.readyState != 4)
				return;
			var xmlDoc = xmlReq.responseXML;
			var cities = xmlDoc.childNodes[0].childNodes[0].childNodes;
			
			var cityName;
			var latitude;
			var longitude;

			for (var i = 0; i < cities.length; i++) {
				cityName = cities[i].childNodes[0].getAttribute ('data');
				latitude = cities[i].childNodes[1].getAttribute ('data');
				longitude = cities[i].childNodes[2].getAttribute ('data');
				
				citiesList.push ({addr : cityName,
								  latitude : latitude / 1000000,
								  longitude: longitude / 1000000});
			}
			svc.output = citiesList;
			svc.notifyOutputReady();
		}
		xmlReq.open ("GET", mapUri (queryString));
		xmlReq.send (null);


    };
    
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

    this.initialize = function() {
        svc.notifyInitializationCompleted();
    };
    
    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };

    this.beginOutput = function() {
		makeCitiesList ('au');
    };
}