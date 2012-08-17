//This is a new one
function(svc) {

    var display;
    var map;
    var inputs = svc.inputs;


    this.initialize = function() {
        display = document.getElementById(svc.displayId);
        document.write("<script id=\"tmp\" src=\"http://dev.ditu.live.com/mapcontrol/mapcontrol.ashx?v=6.1\"><\/script><div id=\"mapView\"></div>");

        document.getElementById("tmp").onreadystatechange = function() {

            if (window.event.srcElement.readyState != 'complete')
                return;

            alert(document.getElementById('display'));

            alert('script loaded : ' + window.event.srcElement.readyState);
            map = new VEMap('display');
            map.LoadMap();
            map.SetCenter (new VELatLong (40, 100));
            svc.notifyInitializationCompleted();
        };
    };

    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };


    this.beginOutput = function() {
        svc.notifyOutputReady();
    };
    
    var addPuhuPin = function (latitute, longitute, pushpinResource, pinDescription, pinTitle) {
        var latlong = new VELatLong (latitute, longitute);
        var pin = new VEShape (VEShapeType.Pushpin, latlong);
        pin.SetCustomIcon (pushpinResource);
        pin.SetDescription (pinDescription);
        pin.SetTitle (pinTitle);
        map.AddShape (pin);
    };
    
    var travelAround = function (latitute, longitute) {
        var latlong = new VELatLong (latitute, longitute);
    }
}