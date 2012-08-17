function (svc) {
    
    this.initialize = function () {
        svc.notifyInitializationCompleted();
    };
    
    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };

    this.beginOutput = function() {

		var songs = [];
		
		songs.push({
			"title" : "那些花儿",
			"album" : "真善美",
			"artist" : "范玮琪"
		});

		songs.push({
			"title" : "小步舞曲",
			"album" : "Groupies",
			"artist" : "陈绮贞"
		});

		songs.push({
			"title" : "生存以上 生活以下",
			"album" : "后青春期的诗",
			"artist" : "五月天"
		});

		
		/*var key;
		
		for (key in contacts) {
			contacts[key].title = contacts[key].first_name + ' ' + contacts[key].last_name;
		}*/

		svc.output = songs;
		svc.notifyOutputReady();
        
    };
}
