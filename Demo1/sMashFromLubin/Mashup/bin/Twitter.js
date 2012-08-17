componentManager.add("twitter", "TwitterClass", "/content/components/icons/twitter.png", "/content/components/icons/twitterLogo.png");

// **************
// BEGIN TWITTER BLOCK
// **************

function TwitterClass()
{
    this.__getLatestPosts = [new TwitterStatus()]; 
}

TwitterClass.prototype.getLatestPosts = function()
{
    var root = environment.getXml("http://twitter.com/statuses/public_timeline.xml");
    var count = root.getElementsByTagName('status').length;
    var statusArray = new Array(count);
    var status = root.getElementsByTagName('status');
    for (var i=0; i<count; i++) 
    { 
        var messageID="", text="", createdAt="", userID="", screenName="";
        var location="", description="", imageUrl="", url="";
        var statusItems=status[i].childNodes;
        for (var k=0; k<statusItems.length; k++)
        {
            if (statusItems[k].nodeType != 1) // nuisance node
            {
            } 
            else if (statusItems[k].firstChild != null)
            {
                switch (statusItems[k].nodeName)
                {
                    case "id" : 
                    { 
                        messageID = statusItems[k].firstChild.nodeValue;
                        break;
                    }
                    case "text" :
                    {
                        text = statusItems[k].firstChild.nodeValue;
                        break;
                    }
                    case "created_at" :
                    {
                        createdAt = statusItems[k].firstChild.nodeValue;
                        break;
                    }
                    case "user" :
                    {
                        var userItems = statusItems[k].childNodes;
                        for (var l=0;l<userItems.length;l++)
                        {
                            if (userItems[l].nodeType != 1) 
                            {
                            } 
                            else if (userItems[l].firstChild != null)
                            {
                                switch (userItems[l].nodeName)
                                {
                                    case "id" : 
                                    { 
                                        userID = userItems[l].firstChild.nodeValue;
                                        break;
                                    }
                                    case "screen_name" : 
                                    { 
                                        screenName = userItems[l].firstChild.nodeValue;
                                        break;
                                    }
                                    case "location" : 
                                    { 
                                        location = userItems[l].firstChild.nodeValue;
                                        break;
                                    }
                                    case "description" : 
                                    { 
                                        description = userItems[l].firstChild.nodeValue;
                                        break;
                                    }
                                    case "profile_image_url" : 
                                    { 
                                        imageUrl = userItems[l].firstChild.nodeValue;
                                        // HACK: twitter sometimes return url as blah.comsystem/blah
                                        // instead of blah.com/system/blah
                                        imageUrl = imageUrl.replace("comsystem", "com/system");
                                        break;
                                    }
                                    case "url" : 
                                    { 
                                        url = userItems[l].firstChild.nodeValue;
                                        break;
                                    }
                                } //inner switch
                            } //inner else if switch 
                        } //inner for
                    }// case
                }//switch
            }//outer else if
        }//for (k)
        statusArray[i] = new TwitterStatus(messageID, text, createdAt, userID, screenName, location, description,imageUrl, url); 
    } //for (i)
    return statusArray;
} 

function TwitterStatus(messageID, text, createdAt, userID, screenName, location, description, imageUrl, url)
{
    this.messageID = messageID;
    this.text = text;
    this.createdAt = createdAt; 
    this.userID = userID;
    this.screenName = screenName;
    this.location = location;
    this.description = description;
    this.imageUrl = imageUrl;
    this.url = url;
    this.toString = function()
    {
        var sb = new Sys.StringBuilder();
        sb.append("<img border='0' src='" + this.imageUrl + "' >" + "<br>");
        sb.append("text: " + this.text + "<br>");
        sb.append("createdAt: " + this.createdAt + "<br>");
        sb.append("screenName: " + this.screenName + "<br>");
        sb.append("location: " + this.location + "<br>");
        sb.append("description: " + this.description + "<br>"); 
        sb.append("<a href='" + this.url + "'>link</a>" + "<br>"); 
        sb.append("<p/>");
        return sb.toString();
    } 
}
// **************
// END TWITTER BLOCK
// **************
