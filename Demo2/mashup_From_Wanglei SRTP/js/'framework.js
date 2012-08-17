
var Framework = function () {
	var thisFramework = this;
	var nodes;
	var blockTypes = {};
	var displayId;

	var numUninitializedNodes;



	/*this.clearOutputs = function () {
		
	};*/

	this.registerBlockType = function (name, constructor) {
		blockTypes[name] = constructor;
	};

	this.initialize = function(diagramConfig, newDisplayId) {

		var namedBlocksConfig = {};
		displayId = 'display';// newDisplayId;

		var connector = new (function () {
			this.displayId = displayId;
	
			this.globalQueueAsyncRequest = function (request, nodeCallback) {
				var fhr = new FlashHttpRequest();

				fhr.onreadystatechange = function () {
					nodeCallback(request);
				};

				fhr.open(request.method, request.uri);
				fhr.send(request.data);
			};
		
			this.globalNotifyInitializationCompleted = function (node) {
				if (--numUninitializedNodes > 0)
					return;
		
				for (var nodeId in nodes) {
					nodes[nodeId].begin();
				}
			};
		
			
		})();


		//  Generate nodes according to `diagramConfig`. 
		nodes = {};

		for (var key in diagramConfig) {
			var blockConfig = diagramConfig[key];
			namedBlocksConfig[blockConfig.id] = blockConfig;

			var node = new Node(blockConfig.id, blockTypes[blockConfig.typeId], connector);
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

	}

	this.beginExecution = function () {
		numUninitializedNodes = nodes.length;

		for (var nodeId in nodes) {
			nodes[nodeId].reload();
		}

	};

};
