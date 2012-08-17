package dart.mashup.mashupAppProcessor;

import java.io.File;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Calendar;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dart.mashup.xmlProcessor.XMLProcessor;
import dart.mashup.xmlWriter.XMLWriter;

public class MashupAppProcessor extends HttpServlet {

	   public  synchronized void doPost(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException {
	        try {
				request.setCharacterEncoding("UTF-8");//防止文件名称带有汉字后传到服务器乱码
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}  
			
			String maName = request.getParameter("name");
		//	String author = request.getParameter("author");
		//	String email = request.getParameter("email"); 
		//	Calendar c = Calendar.getInstance();
		///	int year = c.get(Calendar.YEAR);
		//	int month = c.get(Calendar.MONTH);
		//	int day = c.get(Calendar.DAY_OF_MONTH);
		//	String date = String.valueOf(year) + "-" + String.valueOf(month) + "-" + String.valueOf(day);
			String maDesc = request.getParameter("desc");
			String ts = request.getParameter("tileSource");
		//	String aUrl = request.getParameter("accessUrl");
			String aUrl = "None";
			try{
				PrintWriter out = response.getWriter();
				if(maDesc == "" || ts == "")
					out.write("Please fill in all the required fields ~");
				else{
					File f = new File("E:\\2_MT\\mashupServ\\data\\mashupAppLF.xml"); 
					//File f = new File("G:\\mashupServ\\data\\mashupApp.xml"); 
					org.w3c.dom.Document doc;   
					XMLWriter xmlWriterIns;
					XMLProcessor xmlProIns = new XMLProcessor(f);
					doc = xmlProIns.getDocument();
					xmlWriterIns = new XMLWriter();   
					xmlWriterIns.setDocument(doc);
					xmlWriterIns.setFile(f);		
					int maCount = 0;
					org.w3c.dom.Node root = (org.w3c.dom.Node)xmlWriterIns.getRoot();
					maCount = xmlWriterIns.getChildCount(root);
					org.w3c.dom.Element eleRoot = (org.w3c.dom.Element)root;
					org.w3c.dom.Element eleMA = xmlWriterIns.createChildElement(eleRoot, "mashupApp");
					xmlWriterIns.createAttribute(eleMA, "mashupAppId", String.valueOf(maCount));
			//		org.w3c.dom.Element eleAuthor = xmlWriterIns.createChildElement(eleMA, "author");
			////		xmlWriterIns.createChildText(eleAuthor, author);
			//		org.w3c.dom.Element eleEmail = xmlWriterIns.createChildElement(eleMA, "email");
			//		xmlWriterIns.createChildText(eleEmail, email);
			//		org.w3c.dom.Element eleDate = xmlWriterIns.createChildElement(eleMA, "updated");
			//		xmlWriterIns.createChildText(eleDate, date);					
					org.w3c.dom.Element eleName = xmlWriterIns.createChildElement(eleMA, "name");
					xmlWriterIns.createChildText(eleName, maName);
					org.w3c.dom.Element eleDesc = xmlWriterIns.createChildElement(eleMA, "description");
					xmlWriterIns.createChildText(eleDesc, maDesc);
					org.w3c.dom.Element eleTS = xmlWriterIns.createChildElement(eleMA, "tileSource");
					xmlWriterIns.createCDATASection(eleTS, ts);
					org.w3c.dom.Element eleUrl = xmlWriterIns.createChildElement(eleMA, "accessUrl");
					xmlWriterIns.createChildText(eleUrl, aUrl);
					xmlWriterIns.writeToFile();
					out.write(String.valueOf(maCount) + "+++" );
				//	out.write("Your Mashup application saved !");
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
	    }	

}
