function (svc) {
    var flickrUri = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&text=geotagged+China';
    var extArgs = '&extras=owner_name,geo,date_taken,original_format&per_page=';
    var apiKey = '9a2983e52c66f2ae6493982bdeb2f170';

    var photosList = [];

    var getPicturesFromFlickr = function() {
        var queryUri = flickrUri + extArgs + '&api_key=' + apiKey;
        var xmlDoc = loadXML(queryUri);
        var photos = xmlDoc.selectSingleNode('/rsp/photos');
        var id;
        var owner;
        var secret;
        var title;
        var latitude;
        var longitude;
        var farm;
        var server;

        for (i = 0; i < photos.childNodes.length; i++) {
            id = photos.childNodes[i].getAttribute('id');
            owner = photos.childNodes[i].getAttribute('owner');
            secret = photos.childNodes[i].getAttribute('secret');
            title = photos.childNodes[i].getAttribute('title');
            latitude = photos.childNodes[i].getAttribute('latitude');
            longitude = photos.childNodes[i].getAttribute('longitude');
            farm = photos.childNodes[i].getAttribute('farm');
            server = photos.childNodes[i].getAttribute('server');

            var imageUrl = 'http://farm' + farm + '.static.flickr.com/' + server + '/' + id + '_' + secret + '_s.jpg';
            var imageMedium = 'http://farm' + farm + '.static.flickr.com/' + server + '/' + id + '_' + secret + '_m.jpg';
            var imageBig = 'http://farm' + farm + '.static.flickr.com/' + server + '/' + id + '_' + secret + '.jpg';
            photosList.push(
                    { latitude: latitude,
                        longitude: longitude,
                        title: 'title: ' + title,
                        description: 'owner: ' + owner,
                        image: imageUrl,
                        imageBig: imageBig,
                        imageMedium : imageMedium
                    });
        }
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
        svc.notifyInitializationCompleted ();
    };
    
    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };


    this.beginOutput = function() {
        getPicturesFromFlickr();
        svc.output = photosList;
        svc.notifyOutputReady();
    };
}