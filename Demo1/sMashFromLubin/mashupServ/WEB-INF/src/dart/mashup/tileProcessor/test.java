package dart.mashup.tileProcessor;

import java.io.File;
import java.io.PrintWriter;

import dart.mashup.xmlProcessor.XMLProcessor;
import dart.mashup.xmlWriter.XMLWriter;

public class test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String tileXmlStr = "<tile><name>Youtube</name><providerUrl>http://gdata.youtube.com/feeds/api/videos</providerUrl><description><tags>video</tags><text>Search for image</text>" +
				"</description><category>video</category><services><service name=\"searchVideo\"><description>search videos in youtube</description><input>" +
				"<param className=\"object.string\" name=\"searchText\" required=\"true\"><description>The term to search for</description><defaultValue>football</defaultValue>" +
				"</param></input><output><param className=\"video.title\" name=\"title\"></param><param className=\"photo.thumbnailImageUrl\" name=\"thumbnailUrl\"></param>" +
				"</output></service></services></tile>";

		File f = new File("E:\\2_MT\\mashupServ\\data\\tileBackup.xml");    
		org.w3c.dom.Document doc;   
		XMLWriter xmlWriterIns;
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
			
			org.w3c.dom.Element eleRoot = (org.w3c.dom.Element)root;
			org.w3c.dom.Element eleTileRoot = (org.w3c.dom.Element)doc2.getDocumentElement();
			eleTileRoot.setAttribute("tileId", String.valueOf(tileCount));

			org.w3c.dom.Node newTileRoot = doc.importNode(eleTileRoot, true);
			root.appendChild(newTileRoot);
			xmlWriterIns.writeToFile();
			//PrintWriter out = response.getWriter();
			//out.write(String.valueOf(tileCount));
		}
		catch(Exception ex){
			ex.printStackTrace();
		
		}
	}

}
