function (svc) {
    
	
    this.initialize = function () {
		
		$.getScript('http://www.douban.com/js/api.js?v=2', delayed(function () {
			$.getScript('http://www.douban.com/js/api-parser.js?v=1', delayed(function () {
				svc.notifyInitializationCompleted();
			}));
		}));

    };
    
    this.beginUpdateInputs = function(newInputs) {

		$.each (svc.inputs.queries, parse);

        svc.notifyInputsChanged(newInputs);
    };

    var parse = function (key, srcRecord) {

		var text;
		
		if (isRealTrue(srcRecord.email)) {
			text = srcRecord.email;
		}
		else if (isRealTrue(srcRecord.nick_name)) {
			text = srcRecord.nick_name;
		}
		else if (isRealTrue(srcRecord.title)) {
			text = srcRecord.title;
		}
		else {
			svc.output = [$.extend(true, {}, srcRecord)];
			svc.notifyOutputReady();
			svc.output = [];
			return;
		}

		//alert('search : ' + text);

		var dataURI = 'http://api.douban.com/people?alt=xd&callback=?&apikey=' + api_key('douban') + '&q=' +
			encodeURIComponent(text) + '&max-results=1';
		
		$.getJSON(dataURI, null, delayed(function (data, status) {
			
			var rs = DOUBAN.parseUsers(data);
			
			if (rs.entries.length <= 0) {
				//alert('DOUBAN not found : ' + text);
				svc.output = [$.extend(true, {}, srcRecord)];
				svc.notifyOutputReady();
				svc.output = [];
				return;
			}
			
			$.each(rs.entries, function (key, entry) {
				//alert('DOUBAN found : ' + text);

				var record = $.extend(true, {}, srcRecord);
				
				$.extend(record, {
					"uid/douban" : entry.nid,
					"description" : entry.content,
					"image" : entry.link.icon,
					"addr" : entry.location,
					"url" : entry.link.alternate
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
