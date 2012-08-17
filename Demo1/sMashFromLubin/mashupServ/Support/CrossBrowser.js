var CrossBrowser = {
    Init: function()
    {
        if (Sys.Browser.agent == Sys.Browser.Firefox)
        {
            function privateSelectNodes(xmlDoc, xpath, xNode)  
            {     
                var evaluator = new XPathEvaluator();
                var resolver = xmlDoc.createNSResolver(xmlDoc.documentElement);
                var nodeSet = evaluator.evaluate(xpath, xNode, resolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                var nodes = new Array();
                var node;
                while ((node = nodeSet.iterateNext()) != null)
                {        
                    nodes.push(node);
                }     
                return nodes;
            };
            
            XMLDocument.prototype.selectNodes = function(xpath)  
            {
                return privateSelectNodes(this, xpath, this.documentElement);
            };
                 
            Element.prototype.selectNodes = function(xpath)
            {
                return privateSelectNodes(this.ownerDocument, xpath, this);
            };
            
            XMLDocument.prototype.selectSingleNode = function(xpath)
            {
                var xItems = this.selectNodes(xpath);
                return ((xItems.length > 0) ? xItems[0]: null);
            };
            
            Element.prototype.selectSingleNode = function(xpath)
            {
                var xItems = this.selectNodes(xpath);
                return ((xItems.length > 0) ? xItems[0]: null);
            };
            
            Element.prototype.__defineGetter__("xml", function()
            { 
                var serializer = new XMLSerializer(); 
                return serializer.serializeToString(this); 
            });
            
            Element.prototype.__defineGetter__("text", function()
            {
                return this.textContent;
            });
            
            Element.prototype.__defineSetter__("text", function(v)
            {
                this.textContent = v;
            });
            
            XMLDocument.prototype.__defineGetter__("text", function()
            {
                return this.childNodes[0].textContent;
            });
        }
        else if (Sys.Browser.agent == Sys.Browser.InternetExplorer)
        {
        }
    },

	CreateXmlDocumentFromString: function(content)
	{
	    var doc;
        if (Sys.Browser.agent == Sys.Browser.Firefox)
        {
            var parser = new DOMParser();
            doc = parser.parseFromString(content, "text/xml");
            CrossBrowser.RemoveWhitespaceFromXmlElement(doc.documentElement);
        }
        else
        {
            doc = new ActiveXObject("Msxml2.DOMDocument.3.0");
            doc.loadXML(content);
        }
        return doc;
	},
	RemoveWhitespaceFromXmlElement: function(elem)
	{
	    var child = elem.firstChild;
	    while (child != null)
	    {
	        var next = child.nextSibling;
	        if (child.nodeType == 1)
	        {
	            CrossBrowser.RemoveWhitespaceFromXmlElement(child);
	        }
	        else if (child.nodeType == 3)
	        {
	            if (!((new RegExp("[^\t\n\r ]")).test(child.data)))
	            {
	                elem.removeChild(child);
	            }
	        }
	        child = next;
	    } 
	}
};
