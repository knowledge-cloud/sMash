package dart.mashup.xmlProcessor;


import java.io.*;
import javax.xml.parsers.*;
import org.w3c.dom.*;
import org.xml.sax.*;
import dart.mashup.myException.*;



/**
 * XMLProcessor: get the DOM represenation of a xml file
 * @author Lu_400103
 */
public class XMLProcessor {
    
    private File _f;
    private Document _doc;
    
    /** Creates a new instance of XMLProcessor */
    public XMLProcessor(Document doc){
        _doc = doc;
    }
    
    /**
     * Generate a document for a given xml file
     *
     * @param _f
     */
    public XMLProcessor(File _f) throws MyExcepiton {
        this._f = _f;
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        try {
            DocumentBuilder builder = factory.newDocumentBuilder();
            _doc = builder.parse(_f);
            builder.setErrorHandler(new org.xml.sax.ErrorHandler() {
                public void error(SAXParseException exception) throws SAXException {
                    throw exception;
                }
                public void fatalError(SAXParseException exception) throws SAXException {
                }
                public void warning(SAXParseException exception) throws SAXException {
                    System.out.println("**Parse warning: " + ", line " + 
                            exception.getLineNumber() + ", uri " + 
                            exception.getSystemId());
                    System.out.println("    " + exception.getMessage());
                }
            } );
        }
        catch(SAXParseException spe) {
        	String e = "** Parsing error: " + spe.getMessage();
            System.out.println(e);
            System.out.println("    " + spe.getMessage());
            if(spe.getException() != null){
                Exception x = spe.getException();
                x.printStackTrace();    
            }
            throw new MyExcepiton(e);
        }
        catch (SAXException se){
            Exception x = se;
            if(se.getException() != null)
                x = se.getException();
            x.printStackTrace();
        }
        catch(ParserConfigurationException pce){
            pce.printStackTrace();
        }
        catch(IOException ioe){
            ioe.printStackTrace();
        }
    }
    
    public XMLProcessor(String xmlStr)throws MyExcepiton {
    	StringReader sr = new StringReader(xmlStr); 
    	InputSource is = new InputSource(sr); 
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        try {
            DocumentBuilder builder = factory.newDocumentBuilder();
            _doc = builder.parse(is);
            builder.setErrorHandler(new org.xml.sax.ErrorHandler() {
                public void error(SAXParseException exception) throws SAXException {
                    throw exception;
                }
                public void fatalError(SAXParseException exception) throws SAXException {
                }
                public void warning(SAXParseException exception) throws SAXException {
                    System.out.println("**Parse warning: " + ", line " + 
                            exception.getLineNumber() + ", uri " + 
                            exception.getSystemId());
                    System.out.println("    " + exception.getMessage());
                }
            } );
        }
        catch(SAXParseException spe) {
        	String e = "** Parsing error: " + spe.getMessage();
            System.out.println(e);
            System.out.println("    " + spe.getMessage());
            if(spe.getException() != null){
                Exception x = spe.getException();
                x.printStackTrace();    
            }
            throw new MyExcepiton(e);
        }
        catch (SAXException se){
            Exception x = se;
            if(se.getException() != null)
                x = se.getException();
            x.printStackTrace();
        }
        catch(ParserConfigurationException pce){
            pce.printStackTrace();
        }
        catch(IOException ioe){
            ioe.printStackTrace();
        }
    }
    /**
     * Get the generated document
     * 
     * @return
     */
    public Document getDocument(){
        return _doc;
    }
    
    /**
     * Get the root of the document
     * 
     * @return
     */
   public Object getRoot() { return _doc.getDocumentElement(); }
   
   /**
    * Get number of child
    *  
    * @param parent
    * @return
    */
   public int getChildCount(Object parent)
   {  
      Node node = (Node) parent;
      NodeList list = node.getChildNodes();
      return list.getLength();
   }
   
   /**
    * Get a specific child according to the index
    * 
    * @param parent
    * @param index
    * @return
    */
   public Object getChild(Object parent, int index)
   {  
      Node node = (Node) parent;
      NodeList list = node.getChildNodes();
      return list.item(index);
   }

   /**
    * Get a specific child according to the node name
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
    * Get the index of a specific child
    *  
    * @param parent
    * @param child
    * @return
    */
   public int getIndexOfChild(Object parent, Object child)
   {  
      Node node = (Node) parent;
      NodeList list = node.getChildNodes();
      for (int i = 0; i < list.getLength(); i++)
         if (getChild(node, i) == child)
            return i;
      return -1;
   }

   /**
    * Check whether a specific node is a leaf
    * 
    * @param node
    * @return
    */
   public boolean isLeaf(Object node) { return getChildCount(node) == 0; }
   
   
   /**
    * Search a node according to the node name
    * 
    * @param parent
    * @param name
    * @param result
    * @return
    */
   public org.w3c.dom.Node search(Object parent, String name, Object result){
       org.w3c.dom.Node node =  (org.w3c.dom.Node)parent;
       org.w3c.dom.Node result2 = (org.w3c.dom.Node)result;
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
   public org.w3c.dom.Node findItsParent(String name){
	   org.w3c.dom.Node dataRoot = (org.w3c.dom.Node)getChild(getRoot(), "DATA");
	   org.w3c.dom.Node result = null;
	   result = search(dataRoot, name, result);
	   org.w3c.dom.Node parent = result.getParentNode();
	   String nodeName =  parent.getNodeName();
	   if(nodeName.equals("FILE") || nodeName.equals("WORKING-STORAGE"))
		   return result;
	   else
		   return parent;
   }
        
}
