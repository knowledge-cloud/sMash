function (svc) {
        
    this.initialize = function () {
        svc.notifyInitializationCompleted ();
        $('<div style="height: 440px; overflow:scroll;"></div>')
        .append('<div id="mydiv"></div>')
        .appendTo('#display');
        $('<ul id="myul"></ul>').appendTo('#mydiv');
        
        $('<link rel="Stylesheet" type="text/css" href="css/list_block.css" />').appendTo('head');
        
    }
    
    this.beginUpdateInputs = function (newInputs) {
        
        $(newInputs.data).each (function (i) {
        
            var temp = $('<li></li>')
            .append ('<img class="icon" src="' + this.image + '" alt="' + this.image + '" />')
            .append ('<h3 class="title">' + this.title + '</h3>')
            .append ('<p class="description">' + this.description + '<p>');
            
            var otherKeys = '';
            var urlReg = /http:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
            for (var key in this) {

                if (key != 'image' && key != 'title' && key != 'description') {

                    if (!urlReg.test(this[key])) {
                        otherKeys += key + ': &#160;' + this[key] + '; &#160;';
                    } else {
                        otherKeys += '<a target="_blank" href="' + encodeURI(this[key]) + '">' + key + '</a>&#160;';
                    }

                }

            }
            
            if (otherKeys != '') {
                
                temp.append ('<p class="otherkeys">' + otherKeys + '</p>');
                
            }
            
            temp
            .append ('<div style="clear: both;"></div>')
            .append ('<hr></hr>')
            .appendTo ('#myul');
            
        });
     
        svc.notifyInputsChanged(newInputs);
    }
    
    this.beginOutput = function () {
        svc.notifyOutputReady();
    }
    
}