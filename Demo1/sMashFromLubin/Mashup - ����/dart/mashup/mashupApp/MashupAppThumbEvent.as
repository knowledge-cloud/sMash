
package dart.mashup.mashupApp
{
    
import flash.events.Event;

public class MashupAppThumbEvent extends Event
{
    public static const DETAILS:String = "details";
    public static const BROWSE:String = "browse";
    
    public var mashupApp:MashupApp;
    
    public function MashupAppThumbEvent(type:String, mashupApp:MashupApp)
    {
        super(type);
        this.mashupApp = mashupApp;
    }
    
    override public function clone():Event
    {
        return new MashupAppThumbEvent(type, mashupApp);
    }
}

}