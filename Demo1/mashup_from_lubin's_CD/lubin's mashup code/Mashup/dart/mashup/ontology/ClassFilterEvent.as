
package dart.mashup.ontology
{

import flash.events.Event;

public class ClassFilterEvent extends Event
{
    public static const FILTER:String = "filter";
    
    public var live:Boolean;
    public var filter:ClassFilter;
    
    public function ClassFilterEvent(filter:ClassFilter, live:Boolean)
    {
        super(FILTER);
        this.filter = filter;
        this.live = live;
    }
}

}