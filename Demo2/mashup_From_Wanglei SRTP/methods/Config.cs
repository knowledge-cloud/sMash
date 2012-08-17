using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mashup.Web {
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
}
