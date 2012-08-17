
var Framework = function () {
	var thisFramework = this;
	var nodes;
	var blockTypes = {};
	var displayId;

	/*this.clearOutputs = function () {
		
	};*/

	this.registerBlockType = function (name, constructor) {
		blockTypes[name] = constructor;
	};

	this.initialize = function(diagramConfig, newDisplayId) {

		var namedBlocksConfig = {};
		displayId = 'display';// newDisplayId;
		
		//  Generate nodes according to `diagramConfig`. 
		nodes = {};

		for (var key in diagramConfig) {
			var blockConfig = diagramConfig[key];
			namedBlocksConfig[blockConfig.id] = blockConfig;

			var node = new Node(blockConfig.id, blockTypes[blockConfig.typeId]);
			nodes[blockConfig.id] = node;
		}

		for (var nodeId in nodes) {

			var node = nodes[nodeId];
			var inputs = {};

			var inputsConfigRaw = namedBlocksConfig[nodeId].inputs;
			
			for (var key in inputsConfigRaw) {
				var inputConfigRaw = inputsConfigRaw[key];
				var inputConfig = {};
				
				if (inputConfigRaw.type == 0) {
					inputConfig.type = 0;
					inputConfig.node = nodes[inputConfigRaw.blockId];
				}
				else {
					inputConfig.type = 1;
					inputConfig.value = inputConfigRaw.value;
				}

				inputs[inputConfigRaw.name] = inputConfig;
			}
			
			node.config(inputs);
		}

		alert("wired!");

	}

	this.beginExecution = function () {

		for (var nodeId in nodes) {
			nodes[nodeId].reload();
		}

		for (var nodeId in nodes) {
			nodes[nodeId].begin();
		}

	};




	var Node = function (id, blockClass) {
		var thisNode = this;

		this.status = 0;
		this.id = id;
		this.outgoingWires = [];

		var predefinedInputs = {};
		var numInputs = 0;
		var numPredefinedInputs = 0;


		this.config = function (inputsConfig) {

			for (key in inputsConfig) {
				numInputs++;

				var inputConfig = inputsConfig[key];
				
				if (inputConfig.type) {
					numPredefinedInputs++;
					predefinedInputs[key] = inputConfig.value;
					continue;
				}

				var sourceNodeOutgoingWires = inputConfig.node.outgoingWires;

				if (!sourceNodeOutgoingWires.hasOwnProperty(this.id)) {
					sourceNodeOutgoingWires[this.id] = {node : this, inputNames : []};
				}

				sourceNodeOutgoingWires[this.id].inputNames.push(key);
			}

		};


		this.reload = function () {
			this.data = new Data();
			this.blockObj = new blockClass(this.data);
			this.blockObj.initialize();
		};
		
		this.begin = function () {

			if (numPredefinedInputs) {
			
				for (name in predefinedInputs) {
					this.data.inputs[name] = predefinedInputs[name];
				}
			
			}

			thisNode.blockObj.beginUpdateInputs(predefinedInputs);
		};


		var Data = function () {
			this.state = 0;
			this.inputs = {};
			this.output = null;
			this.numWaitingInputs = numInputs;
			this.blockId = thisNode.id;
			
			this.displayId = displayId;

		
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
			
			
			this.notifyInitializationCompleted = function () {
				alert(thisNode.id + ' : notifyInitializationCompleted []');
			};

			this.notifyInputsChanged = function (newInputs) {

				var inputNames = [];
				
				for (var name in newInputs) {
					inputNames.push(name);
				}

				thisNode.data.numWaitingInputs -= inputNames.length;

				alert(thisNode.id + ' : notifyInputsChanged [' + inputNames.join(', ') + ']');

				if (!this.numWaitingInputs) {
					alert(thisNode.id + ' : beginOutput');
					thisNode.blockObj.beginOutput();
				}
			};


			this.notifyOutputReady = function () {
				alert(thisNode.id + ' : notifyOutputReady []');

				for (var key in thisNode.outgoingWires) {
					var wire = thisNode.outgoingWires[key];
					
					var newInputs = {};
					
					for (var key in wire.inputNames) {
						var name = wire.inputNames[key];

						wire.node.data.inputs[name] = this.output;
						newInputs[name] = this.output;
					}
					
					alert(wire.node.id + ' : beginChangeInputs [' + wire.inputNames.join() + ']');

					wire.node.blockObj.beginUpdateInputs(newInputs);
				}

			};
			
		};
	
	};
	
	function globalQueueAsyncRequest(request, connectorCallback) {
		
		
	}


};
