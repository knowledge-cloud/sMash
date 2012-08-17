package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class mashupShow_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static java.util.List _jspx_dependants;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    JspFactory _jspxFactory = null;
    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      _jspxFactory = JspFactory.getDefaultFactory();
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("<html>\r\n");
      out.write("\r\n");
      out.write("<head>\r\n");
      out.write("\t<TITLE> Mashup Result </TITLE>\r\n");
      out.write("\t<script language=\"JavaScript\" type=\"text/javascript\" src=\"./Support/environment.js\"></script>\r\n");
      out.write("\t<script language=\"JavaScript\" type=\"text/javascript\" src=\"./Support/componentManager.js\"></script>\r\n");
      out.write("\t<script language=\"JavaScript\" type=\"text/javascript\" src=\"./Support/TileJSLib.js\"></script>\r\n");
      out.write("\t<div id=\"jsLib\">\r\n");
      out.write("\t");
 out.print(request.getAttribute("jsSrc").toString());
      out.write("\r\n");
      out.write("\t</div>\r\n");
      out.write("  \t<script language=\"JavaScript\" type=\"text/javascript\">\r\n");
      out.write("\t  function startLTD()\r\n");
      out.write("\t  {\r\n");
      out.write("\t \tvar s = document.getElementById(\"content\").value;\r\n");
      out.write(" \t\tstartLoadTileData(s);\r\n");
      out.write("\t  }\r\n");
      out.write("</script>\t\t\t\r\n");
      out.write("</head>\r\n");
      out.write("<body bgcolor=\"white\" onload=\"startLTD()\">\r\n");
      out.write("\t<div id=\"page_load\" \r\n");
      out.write("     style=\"margin-top:200px;margin-left:100px;text-align:center;z-index:10;position:absolute;width:100px ;height:50px; border:1px \">\r\n");
      out.write("\t\t <table>\r\n");
      out.write("\t \t\t<tr><td>Loading data, please wait... <img src=\"./images/progress.gif\"/></td></tr>\r\n");
      out.write("\t\t </table>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t<input name=\"content\" id=\"content\" type=\"hidden\" value=\"");
out.print(request.getParameter("MPIs")); 
      out.write("\">\t\r\n");
      out.write("\t<div id=\"divOutput\">\r\n");
      out.write("\t\r\n");
      out.write("\t</div>\r\n");
      out.write(" </body>\r\n");
      out.write("</html>\r\n");
      out.write("\r\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      if (_jspxFactory != null) _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
