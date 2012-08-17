import time
import positioning
import xml
from xml.dom.minidom import Document

def location(req):
	hrh=GpsHandler()
	hrh.handler(req)
	del hrh
	return "hello,this is GPS"


class GpsHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
		requ.content_type='text/xml'
		tmp=self.getLocation()
		requ.write(tmp.toxml('utf-8'))
		return ""
		
	def getLocation():
		positioning.select_module(positioning.default_module())
		positioning.set_requestors([{"type":"service","format":"application","data":"test_app"}])
		
		result=positioning.position()
		coordinates=result["position"]
		mylatitude = coordinates["latitude"]
		mylongitude = coordinates["longitude"]
		
		doc=Document()
		wml=doc.createElement("rsp")
		wml.setAttribute("stat","ok")
		doc.appendChild(wml)
		location=doc.createElement("location")
		wml.appendChild(location)
		longitude=doc.createElement("longitude")
		longitude.setAttribute("className","geo.longitude")
		ptext=doc.createTextNode(mylongitude)
		longitude.appendChild(ptext)
		location.appendChild(longitude)
		latitude=doc.createElement("latitude")
		latitude.setAttribute("className","geo.latitude")
		ptext=doc.createTextNode(mylatitude)
		latitude.appendChild(ptext)
		location.appendChild(latitude)
		
		return doc