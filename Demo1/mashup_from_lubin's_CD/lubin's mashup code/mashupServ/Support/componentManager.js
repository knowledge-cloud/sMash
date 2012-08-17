var Components = new Array();

componentManager = {
    add : function(firstBlock, blockClass)
    {
        Components.push({"firstBlock" : firstBlock, "blockClass" : blockClass});
    }
}