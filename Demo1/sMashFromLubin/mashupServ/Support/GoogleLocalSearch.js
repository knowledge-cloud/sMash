function GoogleLocalSearchClass() 
{
}
GoogleLocalSearchClass.prototype.search = function(query, count) {
    // query: The query term for the image search engine (default=Vincent van Gogh)
    // count: The number of results returned from the search engine (default=10)
    if (!count)
        count = 20;
    var jsonUrl = "http://ajax.googleapis.com/ajax/services/search/local?v=1.0&q=" + escape(query);
    var jsonText = environment.getText(jsonUrl);
    if (jsonText.length == 0) {
        throw "Sorry, the Google local search block encountered a problem which it could not solve.";
    }
    else {
        var searchResult = null;
        try {
        	 searchResult = eval('(' + jsonText + ')');
        	 if(searchResult.responseStatus != 200)
        	 	throw "Sorry, the Google local search block encountered a problem which it could not solve.";
        } catch (ex) {
            throw "Sorry, the Google web search block encountered a problem which it could not solve.";
        }
        var i = 0;
        var results = searchResult.responseData.results;
        var searchResults = new Array();
        for(i = 0; i < results.length; i++){
        	var result = results[i];
        	var title = result.title;
        	var googleMapUrl = result.url;
        	var latitude = result.lat;
        	var longitude = result.lng;
        	var streetAddress = result.streetAddress;
        	var city = result.city;
        	var region = result.region;
        	var country = result.country;
        	var ddUrl = result.ddUrl;
        	var ddUrlToHere = result.ddUrlToHere;
        	var ddUrlFromHere = result.ddUrlFromHere;
        	var mapImage = result.staticMapUrl;
        	searchResults.push(new SearchResultObj(title, googleMapUrl, latitude, longitude, streetAddress, city, region, country, ddUrl, ddUrlToHere, ddUrlFromHere,
        	mapImage));
        }
        
		return searchResults;
    }
}
        
function SearchResultObj(title, googleMapUrl, latitude, longitude, streetAddress, city, region, country, ddUrl, ddUrlToHere, ddUrlFromHere,mapImage)
{
	this.title = title;
	this.googleMapUrl = googleMapUrl;
	this.latitude = latitude;
	this.longitude = longitude;
	this.streetAddress = streetAddress;
	this.city = city;
	this.region = region;
	this.country = country;
	this.ddUrl = ddUrl;
	this.ddUrlToHere = ddUrlToHere;
	this.ddUrlFromHere = ddUrlFromHere;
	this.mapImage = mapImage;
}

SearchResultObj.prototype.toString = function()
{
	var str = "<table border='1'>\n" +
			"<tr><td>" + this.title + "</td></tr>\n";
	
	if(this.googleMapUrl != null && this.googleMapUrl != "")
		str = str + "<tr><td><a href='" + environment.escapeQuotes(this.googleMapUrl) + "' target='_blank'>" + "See it in the map: " + environment.escapeQuotes(this.googleMapUrl)
		+ "</a></td></tr>\n";
	
	str += "</table><br><br>";
	
	return str;
  //  return "<a href='" + environment.escapeQuotes(this.rawUrl) + "' target='_blank'></a>";
};
