
var Framework = function() {
    var thisFramework = this;
    var nodes;
    var blockTypes = {};
    var displayId;

    var numNodes;
    var numUninitializedNodes;



    /*this.clearOutputs = function () {
		
	};*/

    this.registerBlockType = function(name, constructor) {
        blockTypes[name] = constructor;
    };

    this.initialize = function(diagramConfig, newDisplayId) {
        numNodes = 0;
        var namedBlocksConfig = {};
        displayId = 'display'; // newDisplayId;

        var connector = new (function() {
            this.displayId = displayId;

            this.globalQueueAsyncRequest = function(request, connectorCallback) {


            };

            this.globalNotifyInitializationCompleted = function(node) {
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

            numNodes++;
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

        //alert("blocks connected!");

    }

    this.beginExecution = function() {
        numUninitializedNodes = numNodes;

        for (var nodeId in nodes) {
            nodes[nodeId].reload();
        }

    };

};
