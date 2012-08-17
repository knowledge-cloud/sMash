package dart.mashup.mashupApp
{
	import mx.collections.ArrayCollection;
	import mx.collections.IViewCursor;

[Bindable]	
	public class MashupApp
	{
		public var name:String;
		public var description:String;
		public var tileSource:String;
	//	public var tags:String;
		public var mashupAppId:int;
		
		public function MashupApp()
		{
		}
		
	    public function fill(obj:Object):void
	    {
	    	this.mashupAppId = obj.mashupAppId;
	    	this.name = obj.name;
	    	this.description = obj.description;
	    //	this.tags = tags;
	    	this.tileSource = obj.tileSource;
	    }

	    public function get tileSourceDesc():String
	    {
	    	var str:String = "";
	    	var tsArr:Array = tileSource.split("    ");
	    	
	    	for(var i:int = 0; i < tsArr.length; i++){
	    		var s:String = tsArr[i] as String;
	    		var index:int = s.indexOf(":");
	    		var index2:int = s.indexOf("  ,  ");
	    		var tpName:String = s.substring(index + 1, index2); 
	    		str += tpName + "\n";
	    	}
	    	
	    	return str;
	    }
	    
	    public function get opers():Array
	    {
	    	var operArr:Array = new Array();
	    	var str:String = "";
	    	var tsArr:Array = tileSource.split("    ");
	    	
	    	for(var i:int = 0; i < tsArr.length; i++){
	    		var obj:Object = new Object();
	    		var s:String = tsArr[i] as String;
	    		var index:int = s.indexOf(":");
	    		var index2:int = s.indexOf("  ,  ");
	    		var tpName:String = s.substring(index + 1, index2);
	    		obj.tpName = tpName;
	    		var sArr:Array = s.split("  ,  ");
	    		var tmpS:String = sArr[1] as String;
	    		var index21:int = tmpS.indexOf(":");
	    		obj.operName = tmpS.substr(index21 + 1, tmpS.length);
	    		operArr.push(obj);
	    	}
	    	
	    	return operArr;
	    	
	    }
	    
	    public function getMPINumber():int
	    {
	    	var tsArr:Array = tileSource.split("    ");
	    	
	    	return tsArr.length;
	    }	
	        		
	}
}