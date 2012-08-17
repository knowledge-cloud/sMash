using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.Text;
using System.Xml;
using System.Xml.Schema;
using System.IO;

namespace Mashup.Web.methods {
    public partial class Post : System.Web.UI.Page {
        protected void Page_Load (object sender, EventArgs e) {
            blockDefinitionFileValide = true;
            String uploadString = null;
            TextReader tempReader = new StreamReader (Request.InputStream, System.Text.Encoding.UTF8);
            int xmlLineNumber = Int32.Parse (tempReader.ReadLine ());
            uploadString = tempReader.ReadToEnd ();

            String xmlString = uploadString.Substring (0, xmlLineNumber);
            String jsString = uploadString.Substring (xmlLineNumber + 2);

            XmlValidatingReader validatingReader = null;
            XmlSchemaCollection xsc = new XmlSchemaCollection ();
            ValidationEventHandler eventHandler = new ValidationEventHandler (validationCallback);

            try {
                XmlDocument document = new XmlDocument ();
                document.LoadXml (xmlString);
                XmlTextReader treader = new XmlTextReader (new StringReader (document.OuterXml));
                xsc.Add ("http://localhost/block/namespace", new XmlTextReader (Request.MapPath ("../blocks/") + "block.xsd"));
                validatingReader = new XmlValidatingReader (treader);
                validatingReader.Schemas.Add (xsc);
                validatingReader.ValidationType = ValidationType.Schema;
                validatingReader.ValidationEventHandler += eventHandler;

                while (validatingReader.Read ()) {

                }

                treader.Close ();
                validatingReader.Close ();

                if (!blockDefinitionFileValide) {
                    return;
                }

                XmlDocument blockRecordXmlDoc = new XmlDocument ();
                blockRecordXmlDoc.Load (Request.MapPath ("../blocks/") + "blocks.xml");
                XmlNode root = blockRecordXmlDoc.SelectSingleNode ("blocks");
                int blockID;
                String blockName;
                
                if (root.HasChildNodes) {
                    blockID = Int32.Parse (((XmlAttribute) root.LastChild.Attributes.Item (0)).Value.Substring ("Block".Length)) + 1;
                } else {
                    blockID = 0;
                }

                XmlNamespaceManager xnsmgr = new XmlNamespaceManager (document.NameTable);
                xnsmgr.AddNamespace ("block", "http://localhost/block/namespace");
                blockName = ((XmlAttribute) document.SelectSingleNode ("block:block", xnsmgr).Attributes.Item (1)).Value;
                XmlElement element = blockRecordXmlDoc.CreateElement ("block:block");
                element.SetAttribute ("id", "Block" + blockID.ToString ());
                element.SetAttribute ("name", blockName);

                blockRecordXmlDoc.SelectSingleNode ("blocks").AppendChild (element);
                blockRecordXmlDoc.Save (Request.MapPath ("../blocks/") + "blocks.xml");

                StreamWriter blockDescriptionXmlFile = File.CreateText (Request.MapPath ("../blocks/") + "Block" + blockID.ToString () + ".xml");
                blockDescriptionXmlFile.Write (xmlString);
                blockDescriptionXmlFile.Close ();

                StreamWriter blockImplementJSFile = File.CreateText (Request.MapPath ("../blocks/") + "Block" + blockID.ToString () + ".js");
                blockImplementJSFile.Write (jsString);
                blockImplementJSFile.Close ();

                Response.Write ("Validate OK, your block has been stored!");
            } catch (Exception exception) {
                Response.Write (exception.Message);
            }
        }

        private void validationCallback (object sender, ValidationEventArgs e) {
            blockDefinitionFileValide = false;
            switch (e.Severity) {
                case XmlSeverityType.Error:
                    Response.Write (XmlSeverityType.Error.ToString () + e.Message);
                    break;
                case XmlSeverityType.Warning:
                    Response.Write (XmlSeverityType.Warning.ToString () + e.Message);
                    break;
            }
        }

        private bool blockDefinitionFileValide = false;
    }
}
