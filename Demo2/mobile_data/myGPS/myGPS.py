def handler(req):
 
   from mod_python import apache
   import location
   import positioning
 
   req.content_type = 'text/xml'
 
   req.write("<?xml version='1.0' encoding='utf-8'?>")
   req.write("<twitnflick>")
   req.write("<modules count='" + str(len(positioning.modules())) + "' default='" + str(positioning.default_module()) + "'>")

 
   req.write("</modules>")	
 
   positioning.set_requestors([{"type":"service","format":"application","data":"test"}])
   gpspos = positioning.position()
   req.write("<position>")
   req.write("<latitude>" + str(gpspos['position']['latitude']) + "</latitude>")
   req.write("<longitude>" + str(gpspos['position']['longitude']) + "</longitude>")
   req.write("<altitude>" + str(gpspos['position']['altitude']) + "</altitude>")
   req.write("<horizontal_accuracy>" + str(gpspos['position']['horizontal_accuracy'])+ "</horizontal_accuracy>")
   req.write("<vertical_accuracy>" + str(gpspos['position']['vertical_accuracy']) + "</vertical_accuracy>")
   req.write("</position>")
 
   req.write("</twitnflick>")
 
   return apache.OK