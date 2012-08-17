using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

namespace Mashup.Web.methods {
    public partial class RunMashupPage : System.Web.UI.Page {
        protected void Page_Load (object sender, EventArgs e) {
            StreamReader reader = new StreamReader (Request.InputStream);
            String pageStringFromClient = "";
            StreamReader htmlStreamReader1 = new StreamReader (File.Open (Request.MapPath (".") + "/style.html_part1", FileMode.Open));
            StreamReader htmlStreamReader2 = new StreamReader (File.Open (Request.MapPath (".") + "/style.html_part2", FileMode.Open));
            pageStringFromClient = htmlStreamReader1.ReadToEnd () + reader.ReadToEnd () + htmlStreamReader2.ReadToEnd ();
            FileStream stream = File.Create (Request.MapPath ("../mashups/") + "temp.html");
            StreamWriter writer = new StreamWriter (stream);
            writer.Write (pageStringFromClient);
            htmlStreamReader1.Close ();
            htmlStreamReader2.Close ();
            writer.Close ();
            stream.Close ();
            reader.Close ();
            Response.Write (Request.Url + "/../../mashups/temp.html");
        }
    }
}
