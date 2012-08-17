// This block uses developer keys.  For security reasons it cannot be ripped and used in a mashup.

function UpcomingClass() 
{
}

UpcomingClass.prototype.findEvents = function(searchText)
{   
    
    // Note - if you look at upcoming.org docs, they say www.upcoming.org which seems to work in the browser. However, what is happening is that
    //  it is returning a HTTP 301 (Moved Permanently which XmlHttpRequest in IE gives a mysterious access denied message on. I spent quite a bit
    // of time scratching my head until some poking around with Fiddler showed me the light
//    var  url = "http://upcoming.org/services/rest/?api_key={0}&method=event.search&search_text=" + searchText;
//    var xml = environment.getXml(url);
//    return xml;
    
    
    //base URL      
    var url = "http://upcoming.org/services/rest/?method=event.search";
  //  url += "&api_key={{Key:ApiKey;http://upcoming.org/services/rest/?method=event.search}}";
  	url += "&api_key=44d5e34cb7";
    //escape function is used for URL encoding for keyword parameter
    url += "&search_text=" + escape(searchText);

    //getting XML response
    var xmlResponse = environment.getXml(url, "upcoming") ;
    //formatting XML response
    //if XML have Error Message
    if(!xmlResponse)
    {
        throw "Sorry, the Upcoming block encountered a problem which it could not solve.";
    }

    // XML came back okay
    else
    {
        var resultArray = xmlResponse.getElementsByTagName("event");
        // no of nodes in returned XML
        var resultNodeCount = resultArray.length;   
        var upcomingEventsItems = new Array(resultNodeCount); 
        // looping through each node
        for(var i = 0; i < resultNodeCount; i++)
        {
            var item = new UpcomingEventsItem();

            item.id = resultArray[i].getAttribute("id");
            item.name = resultArray[i].getAttribute("name");
            item.description = resultArray[i].getAttribute("description");
            item.start_date = resultArray[i].getAttribute("start_date");
            item.end_date = resultArray[i].getAttribute("end_date");
            item.start_time = resultArray[i].getAttribute("start_time");
            item.end_time = resultArray[i].getAttribute("end_time");
            item.personal = resultArray[i].getAttribute("personal");
            item.selfpromotion = resultArray[i].getAttribute("selfpromotion");
            item.metro_id = resultArray[i].getAttribute("metro_id");
            item.venue_id = resultArray[i].getAttribute("venue_id");
            item.user_id = resultArray[i].getAttribute("user_id");
            item.category_id = resultArray[i].getAttribute("category_id");
            item.date_posted = resultArray[i].getAttribute("date_posted");
            item.latitude = resultArray[i].getAttribute("latitude");
            if( item.latitude == "" || item.latitude == null )
                item.latitude = 0;
            item.longitude = resultArray[i].getAttribute("longitude");
            if( item.longitude == "" || item.longitude == null )
                item.longitude = 0;
            item.geocoding_precision = resultArray[i].getAttribute("geocoding_precision");
            item.geocoding_ambiguous = resultArray[i].getAttribute("geocoding_ambiguous");

            upcomingEventsItems[i] = item;
        }
        return upcomingEventsItems;    
    }
};

function UpcomingEventsItem(id, name, description, start_date,
    end_date, start_time, end_time,
    personal, selfpromotion, metro_id, venue_id,
    user_id, category_id, date_posted,
    latitude, longitude, geocoding_precision,
    geocoding_ambiguous)
{
    this.id =                  id;
    this.name =                name;
    this.description =         description;
    this.start_date =          start_date;
    this.end_date =            end_date;
    this.start_time =          start_time;
    this.end_time =            end_time;
    this.personal =            personal;
    this.selfpromotion =       selfpromotion;
    this.metro_id =            metro_id;
    this.venue_id =            venue_id;
    this.user_id =             user_id;
    this.category_id =         category_id;
    this.date_posted =         date_posted;
    this.latitude =            latitude;
    this.longitude =           longitude;
    this.geocoding_precision = geocoding_precision;
    this.geocoding_ambiguous = geocoding_ambiguous;
}

UpcomingEventsItem.prototype.toString = function ()
{
    var html = "";
    
    html += "<table border='0'>" + "\n";
    html += "<tr>" + "\n";
    html += "<td colspan='2'><strong>" + this.name +"</strong></td>\n";
    html += "</tr>" + "\n";
    html += "<tr>" + "\n";
    html += "<td><p>" + this.start_date+"</p></td>\n";
    html += "</tr>" + "\n";
    html += "<tr>" + "\n";
    html += "<td>" + this.description +"</td>\n";
    html += "</tr>" + "\n";
    html += "</table>" + "\n";
    
    return html;
};
