package dart.mashup.tileProcessor;

import javax.servlet.http.HttpServlet;
//import org.apache.log4j.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;

import org.w3c.dom.NodeList;

import java.util.List;
import java.util.Iterator;
import java.io.File;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import dart.mashup.xmlWriter.*;
import dart.mashup.xmlProcessor.*;
import dart.mashup.myException.*;

public class TileProcessor extends HttpServlet {
	
	public TileProcessor(){
		
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
		String tileXmlStr = request.getParameter("tileXmlStr");
		//System.out.println(tileXmlStr);
		//File f = new File("E:\\2_MT\\mashupServ\\data\\tileBackup.xml");
		File f = new File("G:\\mashupServ\\data\\tileBackup-test.xml");
		org.w3c.dom.Document doc;   
		XMLWriter xmlWriterIns;
		try{
		PrintWriter out = response.getWriter();
		try{
			
			XMLProcessor xmlProIns = new XMLProcessor(f);
			doc = xmlProIns.getDocument();
			xmlWriterIns = new XMLWriter();   
			xmlWriterIns.setDocument(doc);
			xmlWriterIns.setFile(f);
			int tileCount = 0;
			org.w3c.dom.Node root = (org.w3c.dom.Node)xmlWriterIns.getRoot();
			
			tileCount = xmlWriterIns.getChildCount(root);
			XMLProcessor xmlProIns2 = new XMLProcessor(tileXmlStr);
			org.w3c.dom.Document doc2 = xmlProIns2.getDocument();
			
			org.w3c.dom.Element eleTileRoot = (org.w3c.dom.Element)doc2.getDocumentElement();
			eleTileRoot.setAttribute("tileId", String.valueOf(tileCount));

			if(isExist(eleTileRoot, root, xmlWriterIns)){
				out.write("tile already exists!");
				return;
			}
			org.w3c.dom.Node newTileRoot = doc.importNode(eleTileRoot, true);
			root.appendChild(newTileRoot);
			xmlWriterIns.writeToFile();

			out.write(String.valueOf(tileCount));
		}
		catch(MyExcepiton me){
			out.write(me.getErrorMsg());
			return;
		}
		catch(Exception ex){
		//	out.write("error:" +ex.p());
			ex.printStackTrace();
		//	return;
		
		}	
		}catch(Exception ex2){
			ex2.printStackTrace();
		}
    }
    private String getTileName(org.w3c.dom.Node node)
    {
       String tileName = "";
  	   NodeList list = node.getChildNodes();
 	   for(int i = 0; i < list.getLength(); i++){
 		   if(list.item(i).getNodeName().equals("name")){
 			   tileName =  list.item(i).getTextContent().toLowerCase();
 			   break;
 		   }
 	   }
 	   
 	   return tileName;
    }
    private Boolean isExist(org.w3c.dom.Node tileRoot, org.w3c.dom.Node root, XMLWriter xmlWriterIns)
    {
       String tileName = getTileName(tileRoot);
	   int childCount = xmlWriterIns.getChildCount(root);
	   for(int i = 0; i < childCount; i++){
		   org.w3c.dom.Node tmpNode = (org.w3c.dom.Node)xmlWriterIns.getChild(root, i);
		   if(tileName.compareTo(getTileName(tmpNode)) == 0)
			   return true;
	   }
	   
	   return false;
    }
}
