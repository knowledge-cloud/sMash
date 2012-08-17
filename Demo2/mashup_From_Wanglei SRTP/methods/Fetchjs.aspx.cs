using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

namespace Mashup.Web.methods {
    public static class Config {

        private static String uriRoot = "http://222.205.46.115/Mashup/";
        private static String fileRoot = "E:/My Documents/Visual Studio 2008/Projects/Mashup/Mashup.Web";


        public static String mapFSPath(String relPath) {
            return fileRoot + relPath;
        }

        public static String mapAbsURI (String relPath) {
            return uriRoot + relPath;
        }

        public static String escape (String s) {
            return s;
        }

    }
    
    public partial class Fetchjs : System.Web.UI.Page {
        protected void Page_Load (object sender, EventArgs e) {
            if (!File.Exists (Request.MapPath ("../blocks/") + Request["id"] + ".js")) {
                Response.Write ("Some blocks not found");
                return;
            } else {
                StreamReader reader = new StreamReader (File.OpenRead (Request.MapPath ("../blocks/") + Request.QueryString["id"] + ".js"));
                String jsString = "framework.registerBlockType(\"" + Config.escape(Request["id"]) + "\", "
                                            + reader.ReadToEnd () +
                                  ");";
                Response.Write (jsString);
                reader.Close ();
            }
        }
    }
}
