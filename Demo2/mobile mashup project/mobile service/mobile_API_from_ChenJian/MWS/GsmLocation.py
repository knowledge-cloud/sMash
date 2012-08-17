from mod_python import util
from httplib import HTTP
import location
import string
import xml
import os, codecs
from xml.dom.minidom import Document

def getLocation(req):
	hrh=AllHandler()
	result=hrh.handler(req)
	del hrh
	return result
	
def doLookup(cellId, lac, host = "www.google.com", port = 80):
	from string import replace
	from struct import unpack
	page = "/glm/mmap"
	http = HTTP(host, port)
	result = None
	errorCode = 0

	content_type, body = encode_request(cellId, lac)
	http.putrequest('POST', page)
	http.putheader('Content-Type', content_type)
	http.putheader('Content-Length', str(len(body)))
	http.endheaders()
	http.send(body)
	errcode, errmsg, headers = http.getreply()
	result = http.file.read()
	if (errcode == 200):
		(a, b,errorCode, latitude, longitude, c, d, e) = unpack(">hBiiiiih",result)
		latitude = latitude / 1000000.0
		longitude = longitude / 1000000.0
	return latitude, longitude

def encode_request(cellId, lac):
	from struct import pack
	content_type = 'application/binary'
	body = pack('>hqh2sh13sh5sh3sBiiihiiiiii', 21, 0, 2, 'in', 13, "Nokia N95 8Gb", 5,"1.3.1", 3, "Web", 27, 0, 0, 3, 0, cellId, lac, 0, 0, 0, 0)
	return content_type, body
	
def getGsmLocation():
	cellid=28523
	lac=22460
	tests=location.gsm_location()
	(latitude,longitude)=doLookup(cellid,lac,"www.google.com",80)
	doc=Document()
	wml=doc.createElement("rsp")
	wml.setAttribute("stat","ok")
	doc.appendChild(wml)
	
	slat=doc.createElement("Latitude")
	ptext=doc.createTextNode(str(latitude))
	slat.appendChild(ptext)
	wml.appendChild(slat)
	
	slong=doc.createElement("Longitude")
	ptext=doc.createTextNode(str(longitude))
	slong.appendChild(ptext)
	wml.appendChild(slong)
	
	return doc

class AllHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
		requ.content_type='text/xml'
		tmp=getGsmLocation()
		requ.write(tmp.toxml('utf-8'))
		return ""
	

