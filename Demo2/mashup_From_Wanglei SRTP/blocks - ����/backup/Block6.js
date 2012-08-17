//This is a new one
function(svc) {

    var display;
    var map;


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



            svc.notifyInitializationCompleted();



        };
        
    };


    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };


    this.beginOutput = function() {
        
        
        for (var pushpin in svc.input.pushpins) {
            
            addPushpin(pushpin.latitute, pushpin.longitude, pushpin.url);
            
        }
        
        svc.notifyOutputReady();
    };
    
    var addPushpin = function (latitute, longitute, url) {
        var shape = new VEShape(VEShapeType.Pushpin, new VELatLong(latitute, longitute));
        shape.SetTitle('兴趣点');
        shape.SetDescription('我的兴趣点');
        map.AddShape(shape);
    };

}