//This is a wrapper for web services that return delayed stock quotes from webservicex.net.
//Web service URL:  http://www.webservicex.net/stockquote.asmx/GetQuote?symbol=<SYMBOL>

function StockQuotesClass() {
};

StockQuotesClass.prototype.getQuote = function(symbol) {
 // Returns a stock quote based on the given symbol.
 //
 // symbol (required): The stock symbol for the company you are searching for (e.g., Microsoft's symbol is "MSFT")
 
 //Validate that the symbol isn't too long of a string
 if(symbol.length > 6){
    throw "The symbol you entered is too long.  Please make sure you are using a valid stock ticker symbol (e.g., Microsoft is \"MSFT\")";
    }
    
 if(symbol.length < 1){
    throw "Please make sure you are using a valid stock ticker symbol (e.g., Microsoft is \"MSFT\")";
    }

 var stockXML = environment.getXml("http://www.webservicex.net/stockquote.asmx/GetQuote?symbol=" + symbol);

// stockXML = browserAbstractionLayer.CreateXmlDocumentFromString(stockXML.text);

 var price = stockXML.getElementsByTagName('Last')[0].text;
 var lastDateTime = stockXML.getElementsByTagName('Date')[0].text + " " + stockXML.getElementsByTagName('Time')[0].text;
 var change = stockXML.getElementsByTagName('Change')[0].text;
 var open = stockXML.getElementsByTagName('Open')[0].text;
 var high = stockXML.getElementsByTagName('High')[0].text;
 var low = stockXML.getElementsByTagName('Low')[0].text;
 var volume = stockXML.getElementsByTagName('Volume')[0].text;
 var name = stockXML.getElementsByTagName('Name')[0].text;
 var marketCap = stockXML.getElementsByTagName('MktCap')[0].text;
 var pe = stockXML.getElementsByTagName('P-E')[0].text;
 return new Quote(price,lastDateTime,change,open,high,low,volume,marketCap,name,pe);
};

StockQuotesClass.prototype.getStockGraph = function(symbol){
 // Returns a graph and vital statistics about a given company's stock.
 //
 // symbol (required): The stock symbol for the company you are searching for (e.g., Microsoft's symbol is "MSFT")
 
 
 //Validate that the symbol isn't too long of a string
 if(symbol.length > 6){
    throw "The symbol you entered is too long.  Please make sure you are using a valid stock ticker symbol (e.g., Microsoft is \"MSFT\"";
    }
 if(symbol.length < 1){
    throw "Please make sure you are using a valid stock ticker symbol (e.g., Microsoft is \"MSFT\"";
    }
 debugger;   
 var quote = StockQuotesClass.prototype.getQuote(symbol);
 var graphURL = "http://data.moneycentral.msn.com/scripts/chrtsrv.dll?symbol=" + symbol + "&E1=0&C1=3&C2=1&E8=1&D5=0&D2=";
 
 //Wrapping in array to be able to have the environment use the toString() function that displays the graph
 var array = new Array(1);
 array[0] = new StockGraph(symbol,quote.price,quote.change,graphURL);
 return array;
}

function Quote(price,lastUpdated,change,open,high,low,volume,marketCap,name,peRatio)
{
    this.price = price;
    this.lastUpdated = lastUpdated;
    this.change = change;
    this.open = open;
    this.high = high;
    this.low = low;
    this.volume = volume;
    this.marketCap = marketCap;
    this.name = name;
    this.peRatio = peRatio;
    
    this.toString = function(){
    var ret = "<h3><b>" + this.name + "</b></h3><h4>Price: " + this.price + "   (";
    if(this.change > 0)
    {
        ret = ret + "<font color=\"green\">" + this.change + "</font>)";
    }
    else
    {
        ret = ret + "<font color=\"red\">" + this.change + "</font>)";
    }
    ret += "</h4>";
    return ret;
    };
};

function StockGraph(symbol,quote,change,graphURL)
{
    // Note that we are not escaping these. It is assumed that these will not have quotes
    this.symbol = symbol;
    this.quote = quote;
    this.change = change;
    this.graphURL = graphURL;
};

StockGraph.prototype.toString = function(){
    var ret = "<h3><b>" + this.symbol + "</b></h3><h4>Price: " + this.quote + "   (";
    if(this.change > 0)
    {
        ret = ret + "<font color=\"green\">" + this.change + "</font>)<br></h4><img src=\"" + this.graphURL + "\"><br><br>";
    }
    else
    {
        ret = ret + "<font color=\"red\">" + this.change + "</font>)<br></h4><img src=\"" + this.graphURL + "\"><br><br>";
    }
    return ret;
};

