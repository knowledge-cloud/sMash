
package dart.mashup.ontology
{

[Bindable]
public class ClassFilter
{
    public var count:int;
    public var series:String;
    
    public function ClassFilter()
    {
        super();
    }
    
    public function accept(ontology:Ontology):Boolean
    {
      //  if (series != "All Series" && series != ontology.series)
        //    return false;
        
        return true;
    }
}

}