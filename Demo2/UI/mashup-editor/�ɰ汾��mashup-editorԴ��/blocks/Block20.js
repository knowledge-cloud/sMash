function (svc) {
    
	var geocoder;

    this.initialize = function () {
		
		$.getScript('http://www.douban.com/js/api.js?v=2', delayed(function () {
			$.getScript('http://www.douban.com/js/api-parser.js?v=1', delayed(function () {
				svc.notifyInitializationCompleted();
			}));
		}));

    };
    
    this.beginUpdateInputs = function(newInputs) {
		
		var srcRecords = svc.inputs.locations;
		var i = 0;
		var n = srcRecords.length;
		
		//alert('Action : ' + JSON.stringify(srcRecords));
		
		n <= i || (function f() {
			parse(i, srcRecords[i]);
			i++;

			if (i < n) {
				setInterval(f, 200);
			}

		}) ();

        svc.notifyInputsChanged(newInputs);
    };

    var parse = function (key, srcRecord) {

		var text = srcRecord.addr;
		
		var dataURI = 'http://api.douban.com/events?alt=xd&callback=?&q=' + encodeURIComponent(text) +
			'&location=all&apikey=' + api_key('douban') + '&max-results=4';

		$.getJSON(dataURI, null, delayed(function (data, status) {
			

			$.each(data.entry, function (key, entry) {

				var record = $.extend(true, {}, srcRecord);
				var addr = entry['gd:where']['@valueString'];
				var description = '<b>' + xhtml(addr) + '</b><br />';
				var sStartDate = long_date_time(new Date(28800000 + new Date(entry['gd:when']['@startTime']).valueOf()));
				var sEndDate = long_date_time(new Date(28800000 + new Date(entry['gd:when']['@endTime']).valueOf()));
				
				//description += sStartDate + ' - ' + sEndDate + '<br /><br />';
				description += xhtml(entry.summary[0]['$t']);
				
				record.addr = addr;
				record.title = entry.title['$t'];
				record.description = description;
				
				$.each (entry.link, function (k, o) {
					
					if (o['@rel'] === 'alternate') {
						record.url = o['$t'];
					}
					else if (o['@rel'] === 'image') {
						record.image = o['@href'];
					}

				});
				
	
				svc.output = [record];
				svc.notifyOutputReady();
				svc.output = [];

			});



		}));
    }


    this.beginOutput = function() {

    };
}
