
package dart.mashup.mashupApp
{

import dart.mashup.mashupApp.MashupApp;

import flash.events.Event;

public class MashupAppListEvent extends Event
{
    public static const ADD_MASHUPAPP:String = "addMashupApp";
    public static const REMOVE_MASHUPAPP:String = "removeMashupApp";
    
    public var mashupApp:MashupApp;
    
    //making the default bubbles behavior of the event to true since we want
    //it to bubble out of the ProductListItem and beyond
    public function MashupAppListEvent(type:String, bubbles:Boolean=true, cancelable:Boolean=false)
    {
        super(type, bubbles, cancelable);
    }
    
}

}