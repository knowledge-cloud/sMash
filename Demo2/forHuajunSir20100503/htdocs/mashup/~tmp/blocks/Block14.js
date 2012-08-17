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
		
		var srcRecords = svc.inputs.users;
		var i = 0;
		var n = srcRecords.length;
		
		//alert('Action : ' + JSON.stringify(srcRecords));
		
		n <= i || (function f() {
			parse(i, srcRecords[i]);
			i++;

			if (i < n) {
				setInterval(f, 1);
			}

		}) ();

        svc.notifyInputsChanged(newInputs);
    };

    var parse = function (key, srcRecord) {

		var text;
		
		
		var uid;
		
		if (typeof srcRecord['uid/douban'] === 'string' && srcRecord['uid/douban'] !== '') {
			uid = srcRecord['uid/douban'];
			
			var dataURI = 'http://api.douban.com/people/' + uid +
				'/miniblog?alt=xd&callback=?&apikey=' + api_key('douban') + '&max-results=10';

			$.getJSON(dataURI, null, delayed(function (data, status) {
				
				var record = $.extend(true, {}, srcRecord);
				var actions = [];

				$.each(data.entry, function (key, entry) {
					//alert('DOUBAN found : ' + text);

					actions.push(xhtml(entry.title['$t']));

					/*description += '\r\n\r\n'
					
					{
						"title" : entry.name,
						"nick_name" : entry.name,
						"image" : entry.link.icon,
						"uid/douban" : entry.nid,
						"description" : entry.content,
						"addr" : entry.location,
						"url" : entry.link.alternate
					};*/


				});


				record.description = '<b>Recent Actions</b><br /><br />' + actions.join('<br />');

				svc.output = [record];
				svc.notifyOutputReady();
				svc.output = [];
	
			}));
		}
		else {
			//svc.output = [$.extend(true, {}, srcRecord)];
			//svc.notifyOutputReady();
			//svc.output = [];
		}
    }


    this.beginOutput = function() {

    };
}
