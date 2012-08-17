package dart.mashup.ajaxHandler;

import java.io.*;
import java.net.URLEncoder;
import java.net.URLDecoder;
import java.net.URL;
import java.net.URLConnection;
import java.net.HttpURLConnection;
import java.nio.charset.CharsetDecoder;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;


public class AjaxHandler extends HttpServlet {
	   public void doService (HttpServletRequest req, HttpServletResponse res)
	      throws ServletException, IOException {
		   try{
			    String urlStr = req.getParameter("req");
			   // String urlNew = URLEncoder.encode(urlStr, "UTF-8");
			   // String urlNew = URLDecoder.decode(urlStr,"UTF-8");
			    String urlNew  = urlStr.replace(' ', '+');
			    
			  //  if(urlNew.indexOf("flickr.com") != -1)
			    	System.out.println(urlNew);
			    URL url = new URL(urlNew);
			    
			    URLConnection urlc = url.openConnection();
			    urlc.setConnectTimeout(0);
			    urlc.setReadTimeout(0);
			    urlc.setAllowUserInteraction(true);
			    urlc.setDoOutput(true);
		   	    urlc.setRequestProperty("Method", req.getMethod());
		   	   // urlc.setRequestProperty("Content-Type", req.getContentType());		    
			/*    Enumeration headers = req.getHeaderNames();	    
		   	    while (headers.hasMoreElements()) {
			   	    String headerName;
			   	    String headerValue;	
		   	        headerName = (String)headers.nextElement();
		   	        if(!isReservedHeader(headerName)){
		   	        	headerValue = req.getHeader(headerName);
		   	        	urlc.setRequestProperty(headerName, headerValue);
		   	        }
		        }
		      */
		   	    int contentLength = req.getContentLength();
		   	    if(contentLength > 0){
		   	    	OutputStreamWriter outStreamWriter = new OutputStreamWriter(urlc.getOutputStream());
		   	    	byte[] remoteBytes = new byte[contentLength];
		   	    	req.getInputStream().read(remoteBytes, 0, remoteBytes.length);
		   	    	outStreamWriter.write(new String(remoteBytes));
		   	    	outStreamWriter.close();	
		   	    }
		   	    //retrieve result
		   	//    Thread.sleep(5000);
		   	    InputStream tmpIS = urlc.getInputStream();
		   	 /*   byte[] bb = new byte[urlc.getContentLength()];
		   	    byte[] bb2 = new byte[urlc.getContentLength()];
		   	    long readBytes = 0, totalBytes = urlc.getContentLength() - 10;
		   	    Thread.sleep(5000);
		   	    while(readBytes < totalBytes){
		   	    	 readBytes = tmpIS.read(bb);
		   	    	//readBytes += tmpCount;
		   	    }
		   	    tmpIS.read(bb);
		   	    tmpIS.close(); */
		   	    BufferedReader in = null;
		   	 String encoding = urlc.getContentEncoding();
		   	    if(encoding == null)
		   	    	encoding = "UTF-8";
		   	    in = new BufferedReader( new InputStreamReader(tmpIS, encoding));
		        String destStr = "";
		        String inputLin="";
		        while ((inputLin = in.readLine()) != null)
		        {
		           destStr += inputLin + "\n";
		        }
		   	    res.setHeader("Cache-Control", "no-cache"); 
		   	    if(urlc.getContentType() != null)
		   	    	res.setContentType(urlc.getContentType());
		   	    

		   	    res.setCharacterEncoding(encoding);
		     //   destStr = URLDecoder.decode(destStr,encoding);
		       
		   	 //   System.out.println(new String(bb, urlc.getContentEncoding()));
		   	    String resStr = new String( destStr.getBytes(encoding), encoding);
		   	    System.out.println(resStr);
		   	    res.getWriter().write(resStr);
		   	    res.getWriter().flush(); 
		   } 
		   catch(Exception e){
			   e.printStackTrace();
			   String errStr = "Unable to get data from " + req.getParameter("req");
			   res.setStatus(500);
			   res.getWriter().write(errStr);
			   res.getWriter().flush();
			//   
		   }
		    
	   }
	   
	    public void doPost(HttpServletRequest req, HttpServletResponse res)
          throws ServletException, IOException {
	    	doService(req, res);
	    }	
	    
	    public void doGet(HttpServletRequest req, HttpServletResponse res)
        throws ServletException, IOException {
	    	doService(req, res);
	    }	    
	    
        public Boolean isReservedHeader(String headerName)
        {
            String header = headerName.toLowerCase();

            return (header == "accept" ||
                    header == "connection" ||
                    header == "content-length" ||
                    header == "content-type" ||
                    header == "date" ||
                    header == "expect" ||
                    header == "host" ||
                    header == "if-modified-since" ||
                    header == "range" ||
                    header == "referer" ||
                    header == "transfer-encoding" ||
                    header == "user-agent" ||
                    header == "proxy-connection");
        }	    
}
