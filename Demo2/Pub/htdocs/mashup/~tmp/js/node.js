var Node = function(id, blockClass, frameworkConnector) {
    var thisNode = this;

    this.status = -1;
    this.id = id;
    this.outgoingWires = [];

    var predefinedInputs = {};
    var numInputs = 0;
    var numPredefinedInputs = 0;


    this.config = function(inputsConfig) {
        this.status = -1;

        for (key in inputsConfig) {
					if (!inputsConfig.hasOwnProperty(key)) { continue; }
            numInputs++;

            var inputConfig = inputsConfig[key];

            if (inputConfig.type) {
                numPredefinedInputs++;
                predefinedInputs[key] = inputConfig.value;
                continue;
            }

            var sourceNodeOutgoingWires = inputConfig.node.outgoingWires;

            if (!sourceNodeOutgoingWires.hasOwnProperty(this.id)) {
                sourceNodeOutgoingWires[this.id] = { node: this, inputNames: [] };
            }

            sourceNodeOutgoingWires[this.id].inputNames.push(key);
        }

        this.status = 0;
    };


    this.reload = function() {
        if (this.status == -1)
            throw "not configured";

        this.status = 0;
        this.data = new Data();
        this.blockObj = new blockClass(this.data);

        this.blockObj.initialize();
    };


    this.begin = function() {
        if (this.status >= 2)
            return;

        if (this.status < 1)
            this.status = 1;

        //alert(this.id + ' : in begin : predefined inputs - ' + numPredefinedInputs + 'status - ' + this.status);

        if (numPredefinedInputs) {

            for (name in predefinedInputs) {
					if (!predefinedInputs.hasOwnProperty(name)) { continue; }
                this.data.inputs[name] = predefinedInputs[name];
            }

            this.status = 2;
            this.blockObj.beginUpdateInputs(predefinedInputs);
        }
        else if (this.status < 2 && this.data.numWaitingInputs == 0) {
            this.status = 3;
            this.blockObj.beginOutput();
        }

    };


    var Data = function() {
        this.state = 0;
        this.inputs = {};
        this.output = null;
        this.numWaitingInputs = numInputs;
        this.blockId = thisNode.id;

        this.displayId = frameworkConnector.displayId;


        var blockedQueue = [];
        var runningQueue = [];

        /*
        this.createRequest = function (uri, callback, method, data) {
        return { uri : uri, callback : wrapCallback(callback), method : method, data : data };
        };

		this.queueAsyncRequest = function (request) {
        if (blockedQueue.length) {
        blockedQueue.push({type: 'request', obj: request});
        }
        else {
        runningQueue.push({type: 'request', request});
        globalQueueAsyncRequest(request, connectorCallback);
        }
        };

		function wrapCallback(callback) {
			
			if (!callback)
        return function () { return true; };
			
			return function () {
				
				callback();
        };
			
			//blockedQueue.
        request.callback();
        }



		
        this.queueDelayedFunc = function (func) {
        if (runningQueue.length || blockedQueue.length) {
        blockedQueue.push({type: 'func', obj: func});
        }
        else {
        func();
        }
        };
		
		*/


        this.notifyInitializationCompleted = function() {
            //alert(thisNode.id + ' : notifyInitializationCompleted []');
            frameworkConnector.globalNotifyInitializationCompleted(thisNode);
        };

        this.notifyInputsChanged = function(newInputs) {

            var inputNames = [];

            for (var name in newInputs) {
					if (!newInputs.hasOwnProperty(name)) { continue; }
                inputNames.push(name);
            }

            thisNode.data.numWaitingInputs -= inputNames.length;

            //alert(thisNode.id + ' : notifyInputsChanged [' + inputNames.join(', ') + ']');

            if (!this.numWaitingInputs) {
                //alert(thisNode.id + ' : beginOutput');
                thisNode.status = 3;
                thisNode.blockObj.beginOutput();
            }
        };


        this.notifyOutputReady = function() {
            //alert(thisNode.id + ' : notifyOutputReady []');

            for (var key in thisNode.outgoingWires) {
					if (!thisNode.outgoingWires.hasOwnProperty(key)) { continue; }
                var wire = thisNode.outgoingWires[key];

                var newInputs = {};

                for (var key in wire.inputNames) {
					if (!wire.inputNames.hasOwnProperty(key)) { continue; }
                    var name = wire.inputNames[key];

                    wire.node.data.inputs[name] = this.output;
                    newInputs[name] = this.output;
                }

                //alert(wire.node.id + ' : beginUpdateInputs [' + wire.inputNames.join() + ']');

                wire.node.status = 2;
                wire.node.blockObj.beginUpdateInputs(newInputs);
            }

        };

    };

};
