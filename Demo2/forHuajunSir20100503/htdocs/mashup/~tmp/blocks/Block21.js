function (svc) {
    
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
		
		var h;
		
		if (n > 0) {
			h = setInterval ((function f() {
				parse(i, srcRecords[i]);
				i++;

				if (i >= n) {
					clearInterval(h);
				}
	
			}), 1000);
		}

        svc.notifyInputsChanged(newInputs);
    };

    var parse = function (key, srcRecord) {

		var text;
		
		
		var uid;
		
		if (typeof srcRecord['uid/douban'] === 'string' && srcRecord['uid/douban'] !== '') {
			uid = srcRecord['uid/douban'];
			
			var dataURI = 'http://api.douban.com/people/' + uid +
				'/collection?alt=xd&callback=?&cat=music&apikey=' + api_key('douban') + '&max-results=1';

			$.getJSON(dataURI, null, delayed(function (data, status) {
				
				

				$.each(data.entry, function (key, entry) {
					//alert('DOUBAN found : ' + text);
					
					var record = {
						"title" : entry.name,
						"nick_name" : entry.name,
						"image" : entry.link.icon,
						"uid/douban" : entry.nid,
						"description" : entry.content,
						"addr" : entry.location,
						"url" : entry.link.alternate
					};

					svc.output = [$.extend(true, {}, record)];
					svc.notifyOutputReady();
					svc.output = [];

				});

				svc.output = [$.extend(true, {}, srcRecord)];
				svc.notifyOutputReady();
				svc.output = [];
	
			}));
		}

    }


    this.beginOutput = function() {

    };
}
