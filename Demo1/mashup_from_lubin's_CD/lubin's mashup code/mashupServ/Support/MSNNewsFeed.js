function MSNNewsFeedClass()
{
}

MSNNewsFeedClass.prototype.getRSSFeed = function(url)
{
 // Retrieves items from the specified RSS feed.
 //
 // url (required): The URL of the RSS feed.
    this.__checkValidation(url);
    var returnResponse = environment.getXml(url);
    return this.__formatResponseDataRSSItem(returnResponse);        
};

// check the validation.
MSNNewsFeedClass.prototype.__checkValidation  = function (url) {   
//	debugger;
    var url = this.__trimParamValue(url);
    
    // check for null value of URL.
    if(url.length == 0)     { throw "Please enter the URL of an RSS" }  
};

// Trims white spaces from the beginning and the end of a string.
MSNNewsFeedClass.prototype.__trimParamValue = function (paramValue){
    
    if(!paramValue)
    {
        return paramValue;
    }
    else if (!isNaN(paramValue))
    {
        return paramValue;
    }

   // return paramValue.trim();
   return paramValue;
};


// process the xml and create the array.
MSNNewsFeedClass.prototype.__formatResponseDataRSSItem = function (resultXML){
    var resultArray  = new Array();
    if(resultXML.getElementsByTagName("channel").length >= 1)
    {   
        var errorCheck = resultXML.getElementsByTagName("channel")[0].getElementsByTagName("description")[0].text;
        errorLength = errorCheck.indexOf('Error');
       
        if(!resultXML)
        {
            throw "Sorry, the RSS block encountered a problem which it could not solve.";
        }
        if(errorLength != -1)
        {
            try
            {
                throw resultXML.getElementsByTagName("channel")[0].getElementsByTagName("description")[0].text;
            }
            catch(ex)
            {
                throw "Sorry, the RSS block encountered a problem which it could not solve.";            
            }
        }
        else
        {    
            var itemNodeList = resultXML.getElementsByTagName('item');
            var resultNodeCount = itemNodeList.length;            
            var resultArray  = new Array(resultNodeCount);
             
            if(!resultNodeCount || resultNodeCount < 1)
            {
                throw "Sorry, it seems that the RSS feed does not contain any items.";                 
            }
            
            for(var i = 0; i < resultNodeCount; i++)
            {   
                var itemNode = itemNodeList[i];
                if(itemNode)
                {                
                    var title =         itemNode.getElementsByTagName("title").length >= 1 ?        itemNode.getElementsByTagName("title")[0].text : "";
                    var source =        itemNode.getElementsByTagName("source").length>= 1 ?        itemNode.getElementsByTagName("source")[0].text : "";
                    var sourceLink =    itemNode.getElementsByTagName("source").length>= 1 ?        itemNode.getElementsByTagName("source")[0].getAttribute("url") : "";
                    var link =          itemNode.getElementsByTagName("link").length >= 1 ?         itemNode.getElementsByTagName("link")[0].text : "";
                    var description =   itemNode.getElementsByTagName("description").length >= 1 ?  itemNode.getElementsByTagName("description")[0].text : "";
                    var author =        itemNode.getElementsByTagName("author").length >= 1 ?       itemNode.getElementsByTagName("author")[0].text : "";
                    var tags =          itemNode.getElementsByTagName("tags").length >= 1 ?         itemNode.getElementsByTagName("tags")[0].text : "";
                    var comments =      itemNode.getElementsByTagName("comments").length >= 1 ?     itemNode.getElementsByTagName("comments")[0].text : "";
                    var pubDate =       itemNode.getElementsByTagName("pubDate").length >= 1 ?      itemNode.getElementsByTagName("pubDate")[0].text : "";
                    var mediaLink =     itemNode.getElementsByTagName("enclosure").length>= 1 ?     itemNode.getElementsByTagName("enclosure")[0].getAttribute("url") : "";
                    var mediaType =     itemNode.getElementsByTagName("enclosure").length>= 1 ?     itemNode.getElementsByTagName("enclosure")[0].getAttribute("type") : "";
                   
                    resultArray[i] = new RSSItem(title, link, description, source, sourceLink,  author, tags, comments, pubDate, mediaLink, mediaType);
                }
            }
            return resultArray; 
        }
    } 
    else
    {          
        return resultArray;  
    }     
};

function RSSItem(title, link, description, source, sourceLink, author, tags, comments, pubDate, mediaLink, mediaType)
{
    this.title = title;
    this.link = link;
    this.description = description;
    this.source= source;  
    this.sourceLink= sourceLink;   
    this.author = author;
    this.tags= tags;  
    this.comments = comments;
    this.publishedDate = pubDate;
    this.mediaLink = mediaLink;   
    this.mediaType = mediaType;   
}

RSSItem.prototype.toString = function() {

    var html = "";
    
    html += "<strong>" + this.title + "</strong>";
    html += "<br /><font style='font-size: xx-small'>"+ this.publishedDate +"</font>" + "\n"; 
    html += "<p>"+ this.description +"</p><hr/>";
    
    return html;
};

MSNNewsFeedClass.prototype.JimJubekMoneyCentralColumn = function()
{
    var url = 'http://articles.moneycentral.msn.com/Feeds/RSS/jubakrss.aspx';
    return this.getRSSFeed(url);
}

MSNNewsFeedClass.prototype.LizPulliamMoneyCentralColumn = function()
{
    var url = 'http://articles.moneycentral.msn.com/Feeds/RSS/lizrss.aspx';
    return this.getRSSFeed(url);
}

MSNNewsFeedClass.prototype.InCarNation = function()
{
    var url = 'http://msnautos.spaces.live.com/feed.rss';
    return this.getRSSFeed(url);
}

MSNNewsFeedClass.prototype.TopCelebrities = function()
{
    var url = 'http://movies.msn.com/rss/topcelebs';
    return this.getRSSFeed(url);
}


MSNNewsFeedClass.prototype.TopBoxOffice = function()
{
    var url = 'http://movies.msn.com/rss/topboxoffice';
    return this.getRSSFeed(url);
}

MSNNewsFeedClass.prototype.TopMovieRentals = function()
{
    var url = 'http://movies.msn.com/rss/topdvdrentals';
    return this.getRSSFeed(url);
}

MSNNewsFeedClass.prototype.InTheaters = function()
{
    var url = 'http://movies.msn.com/rss/intheater';
    return this.getRSSFeed(url);
}

MSNNewsFeedClass.prototype.ComingSoon = function()
{
    var url = 'http://movies.msn.com/rss/comingsoon';
    return this.getRSSFeed(url);
}

MSNNewsFeedClass.prototype.TopStories = function()
{
    var url = 'http://rss.msnbc.msn.com/id/3032091/device/rss/rss.xml';
    return this.getRSSFeed(url);
}
