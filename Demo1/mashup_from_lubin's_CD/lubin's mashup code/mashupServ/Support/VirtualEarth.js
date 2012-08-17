function VirtualEarthClass() {
    // The following document.write is only needed in runtime.
   // debugger;
  //  VirtualEarthClass.initialize(this);
    this.defaultZoom = 2;
    this.lookupsToPerform = [];
    this.waitingOnLookup = false;
}

VirtualEarthClass.prototype.initialLatitude  = 37.189396;
VirtualEarthClass.prototype.initialLongitude = -121.705327; 
VirtualEarthClass.prototype.initialZoom = 2;



VirtualEarthClass.prototype.setDefaultZoomLevel = function(zoom)
{
    this.defaultZoom = zoom;
};

VirtualEarthClass.prototype.setUsePhotoUrlAsIcon = function(usePhotoIcon)
{
    this.usePhotoUrlAsIcon = usePhotoIcon;
};

VirtualEarthClass.prototype.initialize = function() {
// Shows and initializes the map.
    // load the script
  //	debugger;
    if (!VirtualEarthClass.mapScriptLoaded) {        
     //   environment.addExternalScript('http://dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6');
        VirtualEarthClass.mapScriptLoaded = true;
    }
    
    // wait for the script to load (and atlas compat)
    if(!window.VEMap || !window.attachEvent)
    {
    //	var j = document.getElementById("jsLib");
    //	window.alert(j.innerHTML);
        window.setTimeout(delegate(this, function() { this.initialize(); }), 1000/30);
        
        return true; // async callback pending
    }

    // Now continue with initializing the map.
    environment.output("<div><div id='theMap' style='position:relative;height:100%;width:100%'></div></div><div style='position:relative;height:100%;width:100%' id='mapSizer'></div>");
    document.body.style.overflow = "hidden";

    VirtualEarthClass.map = new VEMap("theMap");
    VirtualEarthClass.map.LoadMap(new VELatLong(this.initialLatitude, this.initialLongitude), this.initialZoom ,"h" ,false);
    
   var mapResizer = function() {
       // var mapContainer = $get("mapSizer");    
      // debugger;
        var mapContainer = document.getElementById("mapSizer");
        if(!mapContainer || !mapContainer.offsetWidth) window.setTimeout(mapResizer, 50);
        VirtualEarthClass.map.Resize(mapContainer.offsetWidth, mapContainer.offsetHeight);
    };
    mapResizer();
	window.attachEvent('onresize',mapResizer);
    
    // callback
   // if(callback) { callback(); }
    
    
    return false; 
};

VirtualEarthClass.prototype.setDefaultView = function(latitude, longitude, zoom)
{
  //  if (environment.designTime)
  //      throw "Virtual Earth doesn't support setDefaultView at design time.";

    if (!zoom)
        zoom = this.initialZoom;
    if (!latitude)
        latitude = this.initialLatitude;
    if (!longitude)
        longitude = this.initialLongitude;
        
    var altitude = 10;
    var pitch = -45;
    var heading = 0;
        
    var viewspec = new VEMapViewSpecification(new VELatLong(latitude, longitude), zoom, altitude, pitch, heading);
    VirtualEarthClass.map.SetMapView(viewspec);
    this.propertiesSet = 0;
    
};
 
VirtualEarthClass.prototype.addPushpin = function(latitude, longitude, url, title, description) {
 // Adds a pushpin to the map.
 //
 // latitude (required): The pushpin's latitude
 // longitude (required): The pushpin's longitude
 // url (optional): The URL used for the pushpin's image
 // title (optional): The pushpin's title
 // description (optional): The pushpin's description

  //  if (environment.designTime)
  //      throw "Virtual Earth doesn't support addPushpin at design time.";
	//debugger;
	if(latitude == "null" || latitude == null )
		latitude = 0;
	if(longitude == "null" || longitude == null)
		longitude = 0;
		
	var	centerMapOnPushpin = true;
    var pin = new VEShape(VEShapeType.Pushpin, new VELatLong(latitude, longitude));
  //  debugger;
    if(url && url.toString)
    {	
    	this.usePhotoUrlAsIcon = true;
        if (this.usePhotoUrlAsIcon == true) pin.SetCustomIcon(url.toString());
        if (this.usePhotoUrlAsIcon == false) pin.SetPhotoURL(url.toString());
    }
    if(title && title.toString) pin.SetTitle(title.toString());
    if(description && description.toString) pin.SetDescription(description.toString());
    VirtualEarthClass.map.AddShape(pin);

    if(centerMapOnPushpin)
    {
        this.setMapView(latitude, longitude, this.defaultZoom);
    }
};
 
VirtualEarthClass.prototype.setMapView = function(latitude, longitude, zoom, altitude, pitch, heading) {
 // Sets the current map view.
 //
 // latitude (required): The latitude for the center of the map view
 // longitude (required): The longitude for the center of the map view

  //  if (environment.designTime)
  //      throw "Virtual Earth doesn't support setMapView at design time.";

    if (!zoom)
        zoom = 6;
    if (!altitude)
        altitude = 10;
    if (!pitch)
        pitch = -45;
    if (!heading)
        heading = 0;
        
    var viewspec = new VEMapViewSpecification(new VELatLong(latitude, longitude), zoom, altitude, pitch, heading);
    VirtualEarthClass.map.SetMapView(viewspec);
}; 

VirtualEarthClass.prototype.deleteAllPushpins = function() {
 // Deletes all pushpins from the map.

  //  if (environment.designTime)
  //      throw "Virtual Earth doesn't support deleteAllPushpins at design time.";

    VirtualEarthClass.map.DeleteAllShapes();
};

VirtualEarthClass.prototype.addPushpinByLocation = function(location, url, title, description, centerMapOnPushpin, maxNumber, callback) {
    if(!maxNumber) maxNumber=1;
    
    var findCallback = delegate(this, function(layer, resultsArray, places, hasMore, veErrorMessage)
    {
        this.waitingOnLookup = false;
        if(places && places.length > 0)
        {
            for(var x=0; x < Math.min(places.length, maxNumber); x++)
            {
                var pin = new VEShape(VEShapeType.Pushpin, places[x].LatLong);
                if(url && url.toString)
                {
                    if (this.usePhotoUrlAsIcon == true) pin.SetCustomIcon(url.toString());
                    if (this.usePhotoUrlAsIcon == false) pin.SetPhotoURL(url.toString());
                }
                if(title && title.toString) pin.SetTitle(title.toString());
                if(description && description.toString) pin.SetDescription(description.toString());
                VirtualEarthClass.map.AddShape(pin);
            }

            if(centerMapOnPushpin)
            {
                this.setMapView(places[0].LatLong.Latitude, places[0].LatLong.Longitude, this.defaultZoom);
            }            
        }
        callback();

        // serialize calls to map.Find - it doesn't deal with multiple async calls at same time
        for(var i=0; i<this.lookupsToPerform.length; i++)
        {
            if(this.lookupsToPerform[i].rid == startLookupCallback.rid)
            {
                this.lookupsToPerform.splice(i,1);
                break;
            }
        }
        if(this.lookupsToPerform.length > 0) this.lookupsToPerform[0]();
    });

    var startLookupCallback = delegate(this, function()
    {
        this.waitingOnLookup = true;
        VirtualEarthClass.map.Find(null, location, VEFindType.Businesses, null, 0, maxNumber, false, false, false, false, findCallback);    
    });
    this.rid = (this.rid+1 || 0);
    startLookupCallback.rid = this.rid;    
    if(this.waitingOnLookup) this.lookupsToPerform.push(startLookupCallback);
    else startLookupCallback();
};

VirtualEarthClass.prototype.addPushpinByAddress = function(street, address2, city, state, country, zipCode, url, title, description, centerMapOnPushpin, maxNumber, callback) {
    var address = [street, address2, city, state, country, zipCode];
    var filledAddress = [];
    for(var x=0; x < address.length; x++)
    {
        if(address[x]) filledAddress.push(address[x]);
    }
    if(filledAddress.length == 0) throw "All of the address parameters are empty - at least one must be set.";
    return this.addPushpinByLocation(filledAddress.join(", "), url, title, description, centerMapOnPushpin, maxNumber, callback);
};

