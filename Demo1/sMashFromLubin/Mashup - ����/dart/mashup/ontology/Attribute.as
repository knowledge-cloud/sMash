// ActionScript file

package dart.mashup.ontology
{
	import mx.collections.ArrayCollection;
	
[Bindable]
public class Attribute
{
	public var name:String;
	public var desc:String;
	

	public function Attribute(name:String = null, desc:String = null)
	{
		this.name = name;
		this.desc = desc;
	}
	public function fill(obj:Object):void
	{
		for (var i:String in obj)
		{
			this[i] = obj[i];
		}	
	}
}

}