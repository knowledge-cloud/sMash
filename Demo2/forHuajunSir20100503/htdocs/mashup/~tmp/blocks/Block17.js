function (svc) {
    
	
    this.initialize = function () {
		$.getScript('http://www.douban.com/js/api.js?v=2', delayed(function () {
			$.getScript('http://www.douban.com/js/api-parser.js?v=1', delayed(function () {
				svc.notifyInitializationCompleted();
			}));
		}));

    };
    
    this.beginUpdateInputs = function(newInputs) {
		
		newInputs.album_searches && $.each (svc.inputs.album_searches,
			function (key, srcRecord) {
				
				var text;
				
				if (typeof srcRecord.artist === 'string' && srcRecord.artist !== '') {
					text = srcRecord.artist + ' ';
				}
				else {
					text = '';
				}
				
				if (typeof srcRecord.album === 'string' && srcRecord.album !== '') {
					text += srcRecord.album;
				}
				else if (text === '') {
					return;
				}
				
				parse(key, srcRecord, text, 3);
			});
		
		newInputs.artists && $.each (svc.inputs.artists,
			function (key, srcRecord) {
				
				var text;
				
				if (typeof srcRecord.artist === 'string' && srcRecord.artist !== '') {
					text = srcRecord.artist;
				}
				else {
					return;
				}
				
				parse(key, srcRecord, text);
			});

        svc.notifyInputsChanged(newInputs, 10);
    };

    var parse = function (key, srcRecord, text, maxResults) {

		var dataURI = 'http://api.douban.com/music/subjects?alt=xd&callback=?&apikey=' + api_key('douban') + '&q=' +
			encodeURIComponent(text) + '&max-results=' + maxResults;

		$.getJSON(dataURI, null, delayed(function (data, status) {
			
			var rs = DOUBAN.parseSubjects(data);
			
			if (rs.entries.length <= 0) {
				return;
			}
			
			$.each(rs.entries, function (key, entry) {
				var record = $.extend(true, {}, srcRecord);
				
				var artist = isRealTrue(entry.author.name) ? entry.author.name : entry.singer;
				
				$.extend(record, {
					"title" : entry.title,
					"description" : xhtml(artist),
					"artist" : artist,
					"album" : entry.title,
					"image" : entry.link.image,
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
