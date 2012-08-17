function (svc) {
    
	var uri = mmashupService('Music.py/allMusicJSON?callback=?');


    this.initialize = function () {
        svc.notifyInitializationCompleted();
    };
    
    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };

    this.beginOutput = function() {

		$.getJSON (uri, null, function (tmp_rsp) {
			
			$.post('x-jsonp-strip-iconv?encoding=gbk&callback=?', {"data" : JSON.stringify(tmp_rsp)}, function (rsp) {

				
				var list = [];

				$.each (rsp, function (k, o) {
					
					
					
					list.push({
						"title" : o.title,
						"album" : o.album,
						"artist" : o.artist,
						"year" : o.year
					});
					
				});
				
				svc.output = list;
				svc.notifyOutputReady();

			}, 'jsonp');
			
			
			
			
		});
		
    };
}