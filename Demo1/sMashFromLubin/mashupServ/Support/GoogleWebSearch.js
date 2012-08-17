function GoogleWebSearchClass() 
{
}
GoogleWebSearchClass.prototype.search = function(query, count) {
    // query: The query term for the image search engine (default=Vincent van Gogh)
    // count: The number of results returned from the search engine (default=10)
    if (!count)
        count = 20;
    var jsonUrl = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=" + escape(query);
    jsonUrl += "&lr=lang_en";
    var jsonText = environment.getText(jsonUrl);
    if (jsonText.length == 0) {
        throw "Sorry, the Google web search block encountered a problem which it could not solve.";
    }
    else {
        var searchResult = null;
        try {
        	 searchResult = eval('(' + jsonText + ')');
        	 if(searchResult.responseStatus != 200)
        	 	throw "Sorry, the Google web search block encountered a problem which it could not solve.";
        } catch (ex) {
            throw "Sorry, the Google web search block encountered a problem which it could not solve.";
        }
        var i = 0;
        var results = searchResult.responseData.results;
        var searchResults = new Array();
        for(i = 0; i < results.length; i++){
        	var result = results[i];
        	var rawURL = result.unescapedUrl;
        	var title = result.title;
        	var content = result.content;
        	searchResults.push(new SearchResultObj(rawURL, title, content));
        }
        
		return searchResults;
    }
}
        
function SearchResultObj(rawURL, title, content)
{
	this.rawUrl = rawURL;
    this.title = title;
    this.content = content; 
}

SearchResultObj.prototype.toString = function()
{
	var str = "<table border='1'>\n" +
			"<tr><td><a href='" + environment.escapeQuotes(this.rawUrl) + "' target='_blank'>" + this.title + "</a></td></tr>\n" +
			"<tr><td>" + this.content + "</td></tr>\n" +
			"</table><br><br>";
			
	return str;
  //  return "<a href='" + environment.escapeQuotes(this.rawUrl) + "' target='_blank'></a>";
};
