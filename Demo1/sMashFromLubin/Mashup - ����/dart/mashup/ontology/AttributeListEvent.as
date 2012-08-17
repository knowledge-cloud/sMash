
package dart.mashup.ontology
{

import flash.events.Event;

public class AttributeListEvent extends Event
{
    public static const ADD_ATTRIBUTE:String = "addAttribute";
    public static const REMOVE_ATTRIBUTE:String = "removeAttribute";
    
    public var attribute:Attribute;
    
    //making the default bubbles behavior of the event to true since we want
    //it to bubble out of the ProductListItem and beyond
    public function AttributeListEvent(type:String, bubbles:Boolean=true, cancelable:Boolean=false)
    {
        super(type, bubbles, cancelable);
    }
    
}

}