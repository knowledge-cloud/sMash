function(svc) {


	this.initialize = function() {
		svc.notifyInitializationCompleted();
	};
	
	
	
	function doSearch(query, count) {
		if (query == "")
			throw "You must provide a query!";
			
		if (isNaN(count) || count == 0)
			count = 20;
		else if (count == 0 || count > 50)
			count = 20;
		
		
		var jsonUrl = "http://search.live.com/json.aspx?q=" + escape(query);
		jsonUrl += "&lang=en-us&adlt=strict&count=" + parseInt(count);
		jsonUrl += "&first=0&sourcetype=web&form=popfly";

	
		var xhr = new XMLHttpRequest();
		xhr.open('get', jsonUrl, false);
		xhr.send(null);
		
		if (xhr.status != 200)
			throw 'invalid http status code...';
	
		var jsonText = xhr.responseText;
	
		if (jsonText.length == 0)
		{
			 throw "Sorry, the Windows Live Search block encountered a problem which it could not solve.";
		}
		else {
			eval(jsonText);
			var res = LiveSearchGetResponse().web.results;
			var total = LiveSearchGetResponse().web.total;
			var resultNodeCount = res.length;
			var LiveSearchResults = new Array(resultNodeCount);
			for(var i = 0; i < resultNodeCount; i++)
			{
				  //LiveSearchResults[i] = new LiveSearchResult(res[i].title, res[i].description, res[i].url, res[i].displayUrl, res[i].cacheUrl, total);
				  alert(res[i].title);
			}
		};
			
			
	}


	this.beginUpdateInputs = function(newInputs) {

		if (newInputs.searches) {
			
			for (var key in newInputs.searches) {
				var search = newInputs.searches[key];
				doSearch(search.query, search.count);
			}
			
		}

		svc.notifyInputsChanged(newInputs);
	};


	this.beginOutput = function() {
		
		svc.notifyOutputReady();
	};
	

}
