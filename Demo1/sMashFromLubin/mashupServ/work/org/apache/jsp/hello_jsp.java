package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class hello_jsp extends org.apache.jasper.runtime.HttpJspBase
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
      out.write("\t<script language=\"JavaScript\" type=\"text/javascript\" src=\"./Support/environment.js\"></script>\r\n");
      out.write("\t<script language=\"JavaScript\" type=\"text/javascript\" src=\"./Support/TileJSLib.js\"></script>\r\n");
      out.write("</head>\r\n");
      out.write("<body bgcolor=\"white\">\r\n");
      out.write("\t<div id=\"jsLib\">\r\n");
      out.write("\r\n");
      out.write("\t\r\n");
      out.write("\t</div>\t\r\n");
      out.write("\t<input name=\"content\" id=\"content\" type=\"hidden\" value=\"");
out.print(request.getParameter("MPIs")); 
      out.write("\">\r\n");
      out.write("\t<div id=\"divOutput\">\r\n");
      out.write("\tLoading, please wait...\r\n");
      out.write("\t</div>\r\n");
      out.write("\tdfsdfasdfa\r\n");
      out.write(" </body>\r\n");
      out.write("\r\n");
      out.write("</html>\r\n");
      out.write("\r\n");
      out.write(" \t<script language=\"JavaScript\" type=\"text/javascript\">\r\n");
      out.write(" \t\tdebugger;\r\n");
      out.write(" \t\tvar s = document.getElementById(\"content\").value;\r\n");
      out.write(" \t\tenvironment.output(s);\r\n");
      out.write("\t\tstartLoadTileData(s);\r\n");
      out.write("\t</script>");
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
