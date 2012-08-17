//This is a testfunction(svc) {

    var display;
    var map;


    this.initialize = function() {
        alert('i\'m shooting...');
        display = document.getElementById(svc.displayId);
        //display.innerHTML = "<script type=\"text/javascript\" src=\"../js/native2.js\"></script>\r\n<div id=\"mapview\"></div>";
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
        


        /*var oHead = document.getElementsByTagName('head').item(0);

        var oScript = document.createElement("script");

        oScript.type = "text/javascript";

        oScript.src = "../native2.js";


        oHead.appendChild(oScript);*/

        alert("written");
    };


    this.beginUpdateInputs = function(newInputs) {
        svc.notifyInputsChanged(newInputs);
    };


    this.beginOutput = function() {
        svc.output = svc.inputs.list;
        svc.notifyOutputReady();
    };

}