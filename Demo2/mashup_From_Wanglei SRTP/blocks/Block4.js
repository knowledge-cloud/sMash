function(svc) {

	var oDisplay;
	var map;
	var oSilverlight;


	this.initialize = function() {
		oDisplay = document.getElementById(svc.displayId);

		Silverlight.createObjectEx({
			source: "../misc/ImageSlider.xap",
			parentElement: oDisplay,
			id: "silverlightDisplay", 
			properties: {
				width: "100%", 
				height: "100%",
				background: "white", 
				alt: "<!--not installed-->",
				version: "2.0.31005.0" },
			events: {
				onLoad: handler
			},
			initParams: "param1=value1,param2=value2",
			context: "row4"
		});


		function handler(event) {
			oSilverlight = document.getElementById('silverlightDisplay');
			//alert('in handler');
			

			svc.notifyInitializationCompleted();
		};


	};
		


	this.beginUpdateInputs = function(newInputs) {
		svc.notifyInputsChanged(newInputs);
	};


	this.beginOutput = function() {
	    //alert('in js' + svc.inputs.imageRecords + ' ' + svc.inputs.imageRecords.length);
	    oSilverlight.content.cardPlayer.setPictureList(svc.inputs.imageRecords);

	    //svc.output = svc.inputs.list;
	    svc.notifyOutputReady();
	};

}