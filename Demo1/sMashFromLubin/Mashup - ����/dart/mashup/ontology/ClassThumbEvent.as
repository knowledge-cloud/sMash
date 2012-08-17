
package dart.mashup.ontology
{
    
import flash.events.Event;

public class ClassThumbEvent extends Event
{
    public static const PURCHASE:String = "purchase";
    public static const DETAILS:String = "details";
    public static const BROWSE:String = "browse";
    
    public var ontology:Ontology;
    
    public function ClassThumbEvent(type:String, ontology:Ontology)
    {
        super(type);
        this.ontology = ontology;
    }
    
    override public function clone():Event
    {
        return new ClassThumbEvent(type, ontology);
    }
}

}