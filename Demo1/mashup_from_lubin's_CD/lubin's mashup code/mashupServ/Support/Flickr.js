// This block uses developer keys.  For security reasons it cannot be ripped and used in a mashup.

function FlickrClass() {
    this.DEFAULT_MAX_PHOTOS = 30;
}

FlickrClass.prototype.getPhotos = function(text, number, sort) {
 // Retrieves photos marked with the specified text in the title, description, or tags.
 //
 // text   (required): The desired text
 // number (optional): The maximum number of photos to return (default=30)
    var apikey = "{{Key:APIKey;http://www.flickr.com/services/rest/?method=flickr.photos.search;;getPhotos}}";

    var params = "&sort=" + (sort || "interestingness-desc") + "&text=" + escape(text);
    var photos = this._getFlickrPhotos("flickr.photos.search", number, params, apikey);

    return photos;
};

FlickrClass.prototype.getGeotaggedPhotos = function(text, number) {
 // Retrieves geotagged photos marked with the specified text in the title, description, or tags.
 //
 // text   (required): The desired text
 // number (optional): The maximum number of photos to return (default=30)
    var apikey = "ca4b0ae508ecf7e47f19adc2f2e9dbb3";
//	debugger;
    var params = "&sort=" +  "interestingness-desc" + "&text=geotagged+" + escape(text);
    var photos = this._getFlickrPhotos("flickr.photos.search", number, params, apikey);
    
    return photos;
};

FlickrClass.prototype.getInterestingPhotos = function(date, number) {
 // Retrieves photos flickr considers interesting
 //
 // date   (optional): The date (empty for today)
 // number (optional): The maximum number of photos to return (default=30)
    var apikey = "{{Key:APIKey;http://www.flickr.com/services/rest/?method=flickr.interestingness.getList;;getInterestingPhotos}}";

    var params = "&date=" + escape(date || "");
    var photos = this._getFlickrPhotos("flickr.interestingness.getList", number, params, apikey);
    
    // if there are no interesting photos for today, try yesterday
    if(number > 0 && photos.length == 0 && (!date || date == ""))
    {
        var yesterday = new Date(new Date() - (1000*60*60*24));
        this.getInterestingPhotos(yesterday.format("yyyy-MM-dd"), number);
    }
    
    return photos;
};

FlickrClass.prototype.getUserPhotos = function(userName, number) {
 // Retrieves a user's photos.
 //
 // userName (required): Flickr user name
 // number   (optional): The maximum number of photos to return (default=30)
    var apikey = "{{Key:APIKey;http://www.flickr.com/services/rest/?method=flickr.people.findByUsername;;getUserPhotos}}";

    // get userid
    var params = "&username=" + escape(userName);
    var root = this._getFlickrXml("flickr.people.findByUsername", params, apikey);
    var userNode = root.getElementsByTagName("user");
    if(userNode == null || userNode.length == 0)
    {
        throw "Unable to find user: "+userName;
    }
    var nsid = userNode[0].getAttribute("nsid");

    // get user's photos
    params = "&user_id="+ escape(nsid);
    var photos = this._getFlickrPhotos("flickr.people.getPublicPhotos", number, params, apikey);
    
    return photos;
};

FlickrClass.prototype.getPhotoset = function(photosetId, number) {
 // Retrieves a user's photos.
 //
 // userName (required): Flickr user name
 // number   (optional): The maximum number of photos to return (default=30)
    var apikey = "{{Key:APIKey;http://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos;;getPhotoset}}";

    var params = "&photoset_id="+ escape(photosetId);
    var photos = this._getFlickrPhotos("flickr.photosets.getPhotos", number, params, apikey);    
    
    return photos;
};

FlickrClass.prototype.getTags = function(photoId) {
 // Retrieves the tags for the specified photo.
 //
 // photoId (required): The photo's unique ID
    var apikey = "{{Key:APIKey;http://www.flickr.com/services/rest/?method=flickr.tags.getListPhoto;;getTags}}";
    
    var root = this._getFlickrXml("flickr.tags.getListPhoto", "&photo_id=" + photoId, apikey);

    var tagElements = root.getElementsByTagName('tag');
    var tagArray = new Array();
    for(var i = 0; i < tagElements.length; i++)
    {
        tagArray.push(tagElements[i].getAttribute('raw'));
    }

    return tagArray;
};

FlickrClass.prototype._getFlickrPhotos = function(method, number, extraParams, apikey)
{
    if(!number || isNaN(number)) number = this.DEFAULT_MAX_PHOTOS;
    var params = "&extras=owner_name,geo,date_taken,original_format&per_page="+ number;
    var root = this._getFlickrXml(method, params + extraParams, apikey);
    var photos = this._getPhotoArrayFromXml(root);
    
    return photos;
};

FlickrClass.prototype._getFlickrXml = function(method, params, apikey)
{
    var root = environment.getXml("http://www.flickr.com/services/rest/?method="+ method + params +"&api_key="+ apikey, "flickr");

    var rsp = root.getElementsByTagName("rsp")[0];

    var result = rsp.getAttribute("stat");
    if(result != "ok")
    {
        var errMsg = "flickr returned an unknown error";
        var errNodes = rsp.getElementsByTagName("err");
        if(errNodes)
        {
            errMsg = errNodes[0].getAttribute("msg");
            // ignore file not found errors
            if(errNodes[0].getAttribute("code")!="1")
                throw errMsg;
        }        
    }      
    
    return root;
};

FlickrClass.prototype._getPhotoArrayFromXml = function(root) 
{
    var photoArray = new Array();

    var photos = root.getElementsByTagName("photo");
    var count = photos.length;
    for(var i = 0; i < count; i++)
    {
        var photo = photos[i];
        var id = photo.getAttribute("id");
        var ownerName = photo.getAttribute("ownername");
        var owner = photo.getAttribute("owner");
        var title = photo.getAttribute("title");
        var farm = photo.getAttribute("farm");
        var server = photo.getAttribute("server");
        var secret = photo.getAttribute("secret");
        var originalSecret = photo.getAttribute("original_secret");
        var originalFormat = photo.getAttribute("original_format");
        var lat = photo.getAttribute("latitude");
        var lon = photo.getAttribute("longitude");
        if(photo.getAttribute("accuracy") == 0 && lat == 0 && lon == 0)
        {
            // return null for photos with no geodata so they get skipped by mapping blocks
            lat = null;
            lon = null;
        }
        var url = "http://farm" + farm + ".static.flickr.com/" + server + "/" + id + "_" + secret +"_s.jpg";
       // var url = String.format("http://farm{0}.static.flickr.com/{1}/{2}_{3}_s.jpg", farm, server, id, secret);
       	var mediumUrl = "http://farm" + farm + ".static.flickr.com/" + server + "/" + id + "_" + secret +".jpg";
       // var mediumUrl = String.format("http://farm{0}.static.flickr.com/{1}/{2}_{3}.jpg", farm, server, id, secret);
        var originalUrl;
        if(originalSecret && originalFormat)
        	originalUrl = "http://farm" + farm + ".static.flickr.com/" + server + "/" + id + "_" + originalSecret +"." + originalFormat;
           // originalUrl = String.format("http://farm{0}.static.flickr.com/{1}/{2}_{3}.{4}", farm, server, id, originalSecret, originalFormat);
        else
            originalUrl = mediumUrl;
        var linkUrl = "http://www.flickr.com/photos/" + (owner || ownerName) + "/" + id;
      //  var linkUrl = String.format("http://www.flickr.com/photos/{0}/{1}", owner || ownerName, id);
        var dateTaken = photo.getAttribute("datetaken");
        photoArray.push(new FlickrClass.Photo(id, ownerName, title, url, mediumUrl, originalUrl, linkUrl, lon, lat, dateTaken));
    }
    
    return photoArray;
};

FlickrClass.Photo = function(id, ownerName, title, url, mediumUrl, originalUrl, linkUrl, lon, lat, dateTaken)
{
    this.id = id;
    this.owner = ownerName;
    this.title = title;
    this.url = mediumUrl;
    this.thumbnailUrl = url;
    this.originalUrl = originalUrl;
    this.linkUrl = linkUrl;
    this.longitude = lon;
    this.latitude = lat;
    this.dateTaken = dateTaken;

    this.toString = function()
    {
        return "<a href='" + environment.escapeQuotes( this.linkUrl ) + "' target='_blank'><img style='width:75px;height:75px' src='" +
            environment.escapeQuotes( this.thumbnailUrl ) + "' title='" +
            environment.escapeQuotes( this.title ) + ", ID: " + environment.escapeQuotes( this.id ) + "'/></a>";
    };
};
