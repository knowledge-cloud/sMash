package dart.mashup.xmlWriter;

import java.io.*;
import org.w3c.dom.*;

import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;

/**
 * Create a DOM tree 
 * 
 * @author Lu_400103
 */
public class XMLWriter {
    
    private File _xmlFile;
    private Document _doc;
    
    /** Creates a new instance of XMLWriter */
    public XMLWriter(File xmlFile) {
        _xmlFile = xmlFile;
    }
    public XMLWriter() {
        
    }
    public void setFile(File f){
    	this._xmlFile = f;
    }
    public void setDocument(Document doc){
    	this._doc = doc;
    }
    public void buildDocument() throws Exception{
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
   //     try {
        	factory.setIgnoringElementContentWhitespace(true);
            DocumentBuilder builder = factory.newDocumentBuilder();
            _doc = builder.newDocument();
    //    }
    //    catch (ParserConfigurationException pce){
    //        pce.printStackTrace();
    //    }
    }

    public Document get_doc() {
        return _doc;
    }
    
    /**
     * Create a element which is a child of the root
     * 
     * @param tagName
     * @return
     */
    public Element createElement(String tagName){
        Element ele = _doc.createElement(tagName);
         _doc.appendChild(ele);
         
         return ele;
    }
    
    /**
     * Create a text node
     * 
     * @param textName
     * @return
     */
    public Text createText(String textName){
        return _doc.createTextNode(textName);
    }
    
    /**
     * Create a child element
     * 
     * @param parent
     * @param tagName
     * @return
     */
    public Element createChildElement(Element parent, String tagName){
        Element ele = _doc.createElement(tagName);
        parent.appendChild(ele);
        
        return ele;
    }
    
    /**
     * Create a child text node
     * 
     * @param parent
     * @param textName
     * @return
     */
    public Text createChildText(Element parent, String textName){
        Text text = _doc.createTextNode(textName);
        parent.appendChild(text);
        
        return text;
    }
    
    /**
     * Create a child comment
     * 
     * @param parent
     * @param commentContent
     * @return
     */
    public Comment createChildComment(Element parent, String commentContent){
        Comment comment = _doc.createComment(commentContent);
        parent.appendChild(comment);
        
        return comment;
    }
    
    public CDATASection createCDATASection(Element parent, String data)
    {
    	CDATASection cs = _doc.createCDATASection(data);
    	parent.appendChild(cs);
    	
    	return cs;
    }
    
    public Attr createAttribute(Element ele, String name, String attrValue){
    	Attr attr = _doc.createAttribute(name);
    	attr.setValue(attrValue);
    	ele.setAttributeNode(attr);
    	
    	return attr;
    }
    
    /**
     * Get the document
     *  
     * @return
     */
    public Document getDocument(){
        return _doc;
    }
    
    /**
     * Build model for environment division
     *
     */
    public void buildModelForEnvironmentDivision(){
        Element []ele ={ _doc.createElement("ENVIRONMENT"),
                         _doc.createElement("CONFIGURATION"),
                         _doc.createElement("INPUT-OUTPUT"),
                         _doc.createElement("FILE-CONTROL"),
                         _doc.createElement("I-O")};
        _doc.getDocumentElement().appendChild(ele[0]);
        ele[0].appendChild(ele[1]);
        ele[0].appendChild(ele[2]);
        ele[2].appendChild(ele[3]);
        ele[2].appendChild(ele[4]);  
    }
    
    /** 
     * Get the root of document
     * 
     * @return
     */
    public Object getRoot() { return _doc.getDocumentElement(); }
    
    /** 
     * Get the number of child 
     *
     */
   public int getChildCount(Object parent)
   {  
	  if(parent == null)
		  return 0;
	  
      Node node = (Node) parent;
      NodeList list = node.getChildNodes();
      return list.getLength();
   }
   
   /**
    *  Get a specific child according to the index
    *
    */
   public Object getChild(Object parent, int index)
   {  
      Node node = (Node) parent;
      NodeList list = node.getChildNodes();
      return list.item(index);
   }
   
   /**
    * Get a specific child according to the index
    * 
    * @param parent
    * @param name
    * @return
    */
   public Object getChild(Object parent, String name){
	   Node node = (Node) parent;
	   NodeList list = node.getChildNodes();
	   for(int i = 0; i < list.getLength(); i++){
		   if(list.item(i).getNodeName().equals(name))
			   return list.item(i);
		   continue;
	   }
	   
	   return null;
   }
   
   /**
    * Search a node
    *  
    * @param parent
    * @param name
    * @param result
    * @return
    */
    public org.w3c.dom.Node search(Object parent, String name, Object result){
        org.w3c.dom.Node node =  (org.w3c.dom.Node)parent;
        org.w3c.dom.Node result2 = (org.w3c.dom.Node)result;
        if(node.getNodeName().equals(name))
        	return node;
        for(int i = 0 ; i < getChildCount(node); i++){
            org.w3c.dom.Node child = (org.w3c.dom.Node) getChild(node, i);
            if(child.getNodeName().equals(name)){
                result2 = child;
                return result2;
            }
            result2 = search(child, name, result2);
        }
        
        return result2;
    }
    
    
    /**
     * Write the generated xml to a file
     *  
     * @throws TransformerException
     * @throws IOException
     */
    public void writeToFile() throws TransformerException, IOException {
        Transformer t = TransformerFactory.newInstance().newTransformer();
      
        t.setOutputProperty(OutputKeys.INDENT, "yes");
        t.transform(new DOMSource(_doc), new StreamResult(new FileOutputStream(_xmlFile)));
    }
    
}

