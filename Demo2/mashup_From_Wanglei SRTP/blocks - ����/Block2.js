
	this.initialize = function () {
		
	};


	this.beginUpdateInputs = function (newInputs) {
		svc.notifyInputsChanged(newInputs);
	};


	this.beginOutput = function () {
		svc.output = svc.inputs.list;  alert('i\'m shooting...');
		svc.notifyOutputReady();
	};
