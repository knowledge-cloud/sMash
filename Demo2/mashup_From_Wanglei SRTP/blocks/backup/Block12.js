//This is a new one
function(svc) {

    var display;
    var map;
    var google;


    this.initialize = function() {
var trimQuery = function(query){   
        if(!query)
        {
            return "";
        }
        else if (!isNaN(query))
        {
            return query;
        }
        
        return query.trim();
    }; 

    if (trimQuery == "")
        throw "You must provide a query!";
        

        
    if(isNaN(count) || count == 0)
        count = 20;
    else if (count == 0 || count > 50)
        count = 20;
    
    
    var jsonUrl = "http://search.live.com/json.aspx?q=" + escape(trimQuery);
    jsonUrl += "&lang=en-us&adlt=strict&count=" + parseInt(count);
    jsonUrl += "&first=0&sourcetype=web&form=popfly";

    var jsonText = environment.getText(jsonUrl);

    if (jsonText.length == 0)
    {
	     throw "Sorry, the Windows Live Search block encountered a problem which it could not solve.";
    }
    else
    {
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
        
    };


    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };


    this.beginOutput = function() {
        
        
        for (var pushpin in svc.inputs.pushpins) {
            
            
        }
        
        svc.notifyOutputReady();
    };
    

}