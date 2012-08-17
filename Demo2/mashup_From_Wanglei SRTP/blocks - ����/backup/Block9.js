//This is a new one
function(svc) {

    var display;
    var map;
    var google;


    this.initialize = function() {
        display = document.getElementById(svc.displayId);
        document.write("<script id=\"tmp\" src=\"http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=true_or_false&amp;key=ABQIAAAACI_UYTLjDh4bFNC4xAzxrxTtJr6qScGQH_cgoCiAUIaeZ4ld8RSN20DIdsBnSoWJAF3q8ZozFD-pfQ\"><\/script><div id=\"mapView\"></div>");
        //google.load ("mapView", "2");
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