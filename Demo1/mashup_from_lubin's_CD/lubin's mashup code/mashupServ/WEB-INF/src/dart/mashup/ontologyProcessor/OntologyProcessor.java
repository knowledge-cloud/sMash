package dart.mashup.ontologyProcessor;

import javax.servlet.http.HttpServlet;
//import org.apache.log4j.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.util.List;
import java.util.Iterator;
import java.io.File;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import dart.mashup.xmlWriter.*;
import dart.mashup.xmlProcessor.*;

public class OntologyProcessor extends HttpServlet {
	
	public OntologyProcessor(){
		
	}
    public  synchronized void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException {
        try {
			request.setCharacterEncoding("UTF-8");//防止文件名称带有汉字后传到服务器乱码
			//request.get
			//request.
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String ontologyName = request.getParameter("classN");
		String ontologyDesc = request.getParameter("classDesc");
		String attrValue = request.getParameter("attrValue");
		String author = request.getParameter("author");
		String email = request.getParameter("email"); 
	//	File f = new File("G:\\mashupServ\\data\\ontology.xml");
		File f = new File("E:\\2_MT\\mashupServ\\data\\ontology.xml");    
		org.w3c.dom.Document doc;   
		XMLWriter xmlWriterIns;
		try{
		XMLProcessor xmlProIns = new XMLProcessor(f);
		doc = xmlProIns.getDocument();
		xmlWriterIns = new XMLWriter();   
		xmlWriterIns.setDocument(doc);
		xmlWriterIns.setFile(f);
		int ontologyCount = 0;
		org.w3c.dom.Node root = (org.w3c.dom.Node)xmlWriterIns.getRoot();
		ontologyCount = xmlWriterIns.getChildCount(root);
		org.w3c.dom.Element eleRoot = (org.w3c.dom.Element)root;
		//org.w3c.dom.Element eleCatalog = (org.w3c.dom.Element)xmlWriterIns.getChild(eleRoot, "catalog");
		org.w3c.dom.Element eleOntology = xmlWriterIns.createChildElement(eleRoot, "ontology");
		xmlWriterIns.createAttribute(eleOntology, "ontologyId", String.valueOf(ontologyCount));
		org.w3c.dom.Element eleAuthor = xmlWriterIns.createChildElement(eleOntology, "author");
		xmlWriterIns.createChildText(eleAuthor, author);
		org.w3c.dom.Element eleEmail = xmlWriterIns.createChildElement(eleOntology, "email");
		xmlWriterIns.createChildText(eleEmail, email);
		org.w3c.dom.Element eleName = xmlWriterIns.createChildElement(eleOntology, "name");
		xmlWriterIns.createChildText(eleName, ontologyName);
		org.w3c.dom.Element eleDesc = xmlWriterIns.createChildElement(eleOntology, "description");
		xmlWriterIns.createChildText(eleDesc, ontologyDesc);
		org.w3c.dom.Element eleAttrs = xmlWriterIns.createChildElement(eleOntology, "attributes");
		String attrs[] = new String[10];
		attrs = attrValue.split("55");
		String attribute[] = new String[2];
		for(int i = 0; i < attrs.length; i++){
			attribute = attrs[i].split("44");
			org.w3c.dom.Element eleAttr = xmlWriterIns.createChildElement(eleAttrs, "attribute");
			org.w3c.dom.Element eleAttrName = xmlWriterIns.createChildElement(eleAttr, "name");
			xmlWriterIns.createChildText(eleAttrName, attribute[0]);
			org.w3c.dom.Element eleAttrDesc = xmlWriterIns.createChildElement(eleAttr, "desc");
			xmlWriterIns.createChildText(eleAttrDesc, attribute[1]);			
		}
		org.w3c.dom.Element eleImage = xmlWriterIns.createChildElement(eleOntology, "image");
		xmlWriterIns.createChildText(eleImage, "assets/classIcon/class.png");	

			xmlWriterIns.writeToFile();
			PrintWriter out = response.getWriter();
			out.write(String.valueOf(ontologyCount));
		}
		catch(Exception ex){
			ex.printStackTrace();
		
		}
		
		
    }
}
