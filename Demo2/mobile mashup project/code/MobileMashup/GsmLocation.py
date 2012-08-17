# -*- coding: utf-8 -*-

from mod_python import util
from httplib import HTTP
import location
import string
import os, codecs

import ig_libs
import jsonh
import tfunction
import dictoxml

def getLocation(req):
	hrh=LocationHandler()
        result=hrh.handler(req)
        req.content_type='text/xml'
        result=dictoxml.dicToXML(result,"Location")
        req.write(result)
        del hrh
        return ""

	
def getLocationJSON(req):
	hrh=LocationHandler()
        result=hrh.handler(req)
        req.content_type='text/json'
        tmp=tfunction.parse_args(req)
        args=tmp.get_vars
        try:
                callback=str(args['callback'])
        except KeyError:
                callback=None
        if(callback!=None):
                result=callback+'('+jsonh.encode(result)+')'
                req.write(result)
        else:
                return "callback function missing"
        return ""

	
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

def getJGsm():
        lo=location.gsm_location()
        jGsm={}
        if(lo!=None):
                cellid=lo[2]
                lac=lo[3]
                (latitude,longitude)=doLookup(cellid,lac,"www.google.com",80)

                jGsm['0']={}
                jGsm['0']['latitude']=str(latitude).encode('utf-8')
                jGsm['0']['longitude']=str(longitude).encode('utf-8')
        else:
                jGsm['0']={}
                jGsm['0']['error']="please sign your python script shell! could not get gsm_location".encode('utf-8')
                
	
	return jGsm

class AllHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
		requ.content_type='text/xml'
		tmp=getGsmLocation()
		requ.write(tmp.toxml('utf-8'))
		return ""
		
class LocationHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
                tmp=getJGsm()
		return tmp
	

