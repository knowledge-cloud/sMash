
package dart.mashup.ontology
{
	import mx.collections.ArrayCollection;
	import mx.collections.IViewCursor;

[Bindable]
public class Ontology
{
	
	public var author:String;
	public var email:String;
    public var ontologyId:int;
    public var name:String;
    public var description:String;
	public var attributes:ArrayCollection;
	public var image:String;
    public var qty:int;

    public function Ontology(author:String = "", email:String = "", ontologyId:int = 0, name:String = "", desc:String = "", image:String ="")
    {
		attributes = new ArrayCollection();
		this.author = author;
		this.email = email;
		this.ontologyId = ontologyId;
		this.name = name;
		this.description = desc;
		this.image = "assets/classIcon/class.png";
    }
    public function fillAttributes(attributes:ArrayCollection):void
    {
    	this.attributes = attributes;
    }

    public function fill(obj:Object):void
    {
    	this.ontologyId = obj.ontologyId;
    	this.name = obj.name;
    	this.description = obj.description;
    	if(obj.attributes == null)
    		return;

    	var tempObj:Object = obj.attributes.attribute;
    	var tempStr:String = tempObj.toString();
    	var temp:ArrayCollection = new ArrayCollection();
    	if(tempStr.search(",") != -1)
    		temp = obj.attributes.attribute;
    	else
    		temp.addItem(tempObj);	
        var cursor:IViewCursor = temp.createCursor();
        while (!cursor.afterLast) 
        {
    	    var attribute:Attribute = new Attribute();
	        attribute.fill(cursor.current);
        	attributes.addItem(attribute);
        	cursor.moveNext();
        }        
    }
    public function get attributeNameStr():String
    {
    	var str:String = "";
    	for(var i:int = 0; i < attributes.length; i++){
    		str += attributes[i].name + "\n";
    	}
    	
    	return str;
    }
    
    public function toString():String
    {
    	return this.name;
    }


}

}