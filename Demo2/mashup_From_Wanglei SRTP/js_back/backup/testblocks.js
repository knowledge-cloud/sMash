

function (svc) {

    this.initialize = function() {
        var a = [];




        var request = svc.createRequest(uri); //, method 'get/post', data, callback);
        var response = svc.doRequest(request);

        response.statusCode;
        response.text;
        response.document;


    
    };


	this.beginUpdateInputs = function(newInputs) {
	
	
		svc.notifyInputsChanged(newInputs);
	};


	this.beginOutput = function() {

	svc.output = [1, 2, 3, 4];
	    


	    svc.notifyOutputReady();
	};
}

