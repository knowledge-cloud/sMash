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
        var shape = new VEShape(VEShapeType.Pushpin, new VELatLong(30, 20));
        shape.SetTitle('兴趣点');
        shape.SetDescription('我的兴趣点');
        map.AddShape(shape);


            svc.notifyInitializationCompleted();



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