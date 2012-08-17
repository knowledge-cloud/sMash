
package dart.mashup.ontology
{

import flash.events.Event;

public class ClassListEvent extends Event
{
    public static const ADD_CLASS:String = "addClass";
    public static const REMOVE_CLASS:String = "removeClass";
    
    public var ontology:Ontology;
    
    //making the default bubbles behavior of the event to true since we want
    //it to bubble out of the ProductListItem and beyond
    public function ClassListEvent(type:String, bubbles:Boolean=true, cancelable:Boolean=false)
    {
        super(type, bubbles, cancelable);
    }
    
}

}