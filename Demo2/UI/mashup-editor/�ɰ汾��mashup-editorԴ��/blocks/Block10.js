function (svc) {
    
	var geocoder;
	
    this.initialize = function () {
		svc.notifyInitializationCompleted();
		return;
		//
		//var oHead = document.getElementsByTagName('head').item(0);
		//var oGMapScript = document.createElement('script');
		//
		//var handler = function (event) {
		//	//alert('in handler');
		//	geocoder = new GClientGeocoder();
		//	svc.notifyInitializationCompleted();
		//};
		//
		//oGMapScript.type = 'text/javascript';
		//
		//if (document.domain !== 'localhost') {
		//	alert('not local');
		//	oGMapScript.src += '&key=ABQIAAAAkg7-eA0AvCN3fPJtRdFCfhQKzxAJIqEenm5lgbvw1FZysTEO4BRqOczv8w8TgJG57NrtfAxPCW6_Kg';
		//}
		//
		//if (oGMapScript.readyState !== undefined) {
		//	oGMapScript.onreadystatechange = function (event) {
		//		//alert('ready state changed...');
		//		if (oGMapScript.readyState == 4 || oGMapScript.readyState == 'complete' || oGMapScript.readyState == 'loaded') {
		//			handler.call(null, event);
		//		}
		//	};
		//}
		//else {
		//	//alert('loaded...');
		//	oGMapScript.onload = handler;
		//}
		//
		//oGMapScript.src = 'http://maps.google.com/maps/api/js?sensor=false';
		//oHead.appendChild(oGMapScript);
    };
    
    this.beginUpdateInputs = function(newInputs) {
        var records = $.extend(true, [], svc.inputs.phones);

		$.each(records, parse);

        svc.notifyInputsChanged(newInputs);
    };

    var parse = function (key, record) {
		
		var phone2cityURI = mapUri('http://api.showji.com/locating/?m=' + record.phone_number + '&output=xml');

		$.get(phone2cityURI, null, (function (xmlDoc, status) {
			
			if (xmlDoc === null) {
				//...
				alert('outer callback fail' + record.title);
				return;
			}
		
			var tmp = xmlDoc.getElementsByTagName('QueryResult');
			
			if (tmp.length <= 0 || tmp[0].childNodes[0].data !== 'True')
				return;
		
			var province = xmlDoc.getElementsByTagName('Province')[0].childNodes[0].data;
			var city = xmlDoc.getElementsByTagName('City')[0].childNodes[0].data;
			
			if (province === city) {
				record.addr = city;
			}
			else {
				record.addr = province + ' ' + city;
			}
		
			record.mobile_network = xmlDoc.getElementsByTagName('Corp')[0].childNodes[0].data;
			record.post_code = xmlDoc.getElementsByTagName('PostCode')[0].childNodes[0].data;
			record.image = 'http://mashup.lolita0.com/contact_icon.png';
			
			var geocoderURI = mapUri(
				'http://maps.google.com/maps/api/geocode/json?region=CN&sensor=false&address=' +
				encodeURIComponent(record.addr));

			$.get(geocoderURI, null, function (obj) {
				
				if (!obj || obj.status !== 'OK') {
					record.latitude = Math.round((20 + 24 * Math.random()) * 100) / 100;
					record.longitude = Math.round((96 + 24 * Math.random()) * 100) / 100;
					record.addr += ' (Not Found)';
				}
				else {
					record.latitude = obj.results[0].geometry.location.lat;
					record.longitude = obj.results[0].geometry.location.lng;
				}

				//alert(record.description);
				if (typeof record.description !== 'string' || record.description === '') {
					record.description = xhtml(record.addr);
				}
				else {
					record.description = xhtml(record.addr + '\r\n\r\n' + record.description);
				}
		
				svc.output = [record];
				svc.notifyOutputReady();
				svc.output = [];
		
			}, 'json');
		
			
		}), 'xml');
    }



    this.beginOutput = function() {
        
    };
}
