package dart.mashup.mpiProcessor;

import javax.servlet.http.HttpServlet;
//import org.apache.log4j.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;

import dart.mashup.xmlProcessor.XMLProcessor;
import dart.mashup.xmlWriter.XMLWriter;

import java.util.List;
import java.util.Iterator;
import java.io.File;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

public class MPIProcessor extends HttpServlet{
		
	   private int MAX_MPI_NUMBER = 50;
	   
	   public synchronized void doService(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException {
	        try {
	        	Boolean flag = false;
				request.setCharacterEncoding("UTF-8");//防止文件名称带有汉字后传到服务器乱码
				String mpiStr = request.getParameter("MPIs");
				int mpiNumber = Integer.parseInt(request.getParameter("MPINumber"));
				String[] tpNameArr = new String[mpiNumber]; 
				String[] mpiArr = mpiStr.split("    ");
				String s = "<script language=\"JavaScript\" type=\"text/javascript\" src=\"";
				String sEnd = "\"></script>";
				String scriptS = "";
				
				for(int i = mpiArr.length - 1; i >= 0; i--){
					int index1 = mpiArr[i].indexOf(":");
					int index2 = mpiArr[i].indexOf("  ,  ");
					String tmpName = mpiArr[i].substring(index1 + 1, index2);
					scriptS = scriptS + s + "./Support/" + tmpName + ".js" + sEnd;
					if(tmpName.compareTo("VirtualEarth") == 0)
						scriptS = scriptS + s + "http://dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=6" + sEnd + "\n";
				}
				request.setAttribute("jsSrc", scriptS);
				this.getServletConfig().getServletContext().getRequestDispatcher("/mashupShow.jsp").forward(request, response);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			catch (Exception e){
				e.printStackTrace();
			}
	    }
	   
	   public void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException {
		   	doService(request, response);
	    }	  
	   
	   public void doPost(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException {
		   doService(request, response);
	    }	   
}
