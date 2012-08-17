function (svc) {
    var flickrUri = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&text=geotagged+China';
    var extArgs = '&extras=owner_name,geo,date_taken,original_format&per_page=';
    var apiKey = '9a2983e52c66f2ae6493982bdeb2f170';

    var photosList = [];

    var getPicturesFromFlickr = function(xmlDoc) {

		var photos = xmlDoc.documentElement.getElementsByTagName('photos')[0].getElementsByTagName('photo');
	
		
        //var photos = xmlDoc.selectSingleNode('/rsp/photos');
        var id;
        var owner;
        var secret;
        var title;
        var latitude;
        var longitude;
        var farm;
        var server;

        for (i = 0; i < photos.length; i++) {
            id = photos[i].getAttribute('id');
            owner = photos[i].getAttribute('owner');
            secret = photos[i].getAttribute('secret');
            title = photos[i].getAttribute('title');
            latitude = photos[i].getAttribute('latitude');
            longitude = photos[i].getAttribute('longitude');
            farm = photos[i].getAttribute('farm');
            server = photos[i].getAttribute('server');

            var imageUrl = 'http://farm' + farm + '.static.flickr.com/' + server + '/' + id + '_' + secret + '_s.jpg';
            var imageMedium = 'http://farm' + farm + '.static.flickr.com/' + server + '/' + id + '_' + secret + '_m.jpg';
            var imageBig = 'http://farm' + farm + '.static.flickr.com/' + server + '/' + id + '_' + secret + '.jpg';
            photosList.push(
                    { latitude: latitude,
                        longitude: longitude,
                        title: title,
                        description: xhtml('Owner: ' + owner),
                        image: imageUrl,
                        imageBig: imageBig,
                        imageMedium : imageMedium
                    });
        }
    }

    this.initialize = function () {
        svc.notifyInitializationCompleted ();
    };

    
    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };


    this.beginOutput = function() {
		var queryUri = flickrUri + extArgs + '&api_key=' + apiKey;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (this.readyState != 4 && this.readyState != 'complete' && this.readyState != 'loaded')
				return;
			//alert ("OK1");
			getPicturesFromFlickr(xhr.responseXML);
			svc.output = photosList;
			svc.notifyOutputReady();
			//alert ("OK2" + xhr.responseText.length);
		};

		xhr.open('GET', mapUri (queryUri));
		xhr.send(null);

    };
}
