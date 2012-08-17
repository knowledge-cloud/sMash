# -*- coding: utf-8 -*-

import ig_libs
import jsonh
import tfunction

from mod_python import util
import contacts
import time
import xml
from xml.dom.minidom import Document
import sys
import os, codecs

def allMusic(req):
	hrh=AllHandler()
	result=hrh.handler(req)
	del hrh
	return result
	
def allMusicJSON(req):
	hrh=AllMusicJHandler()
	result=hrh.handler(req)
	del hrh
	return result

def getID3(filename):
	fp=open(filename,'r')
	fp.seek(-128,2)
	
	fp.read(3)
	title=fp.read(30)
	artist=fp.read(30)
	album=fp.read(30)
	year=fp.read(4)
	comment=fp.read(28)
	
	fp.close()
	
	return {'title':title,'artist':artist,'album':album,'year':year}
	
def getAllMusic():
	doc=Document()
	wml=doc.createElement("rsp")
	wml.setAttribute("stat","ok")
	doc.appendChild(wml)
	folder="e:\\Sounds"
	Id=1
	for f in os.listdir(folder):
		if(f.endswith('.mp3')):
			subMusic=doc.createElement("Music")
			strId='%s' %Id
			subMusic.setAttribute("id",strId)
			wml.appendChild(subMusic)
			tmpFolder=folder+"\\"+f
			muInfo=getID3(tmpFolder)
			
			subTitle=doc.createElement("title")
			tStr=muInfo['title'][29:30]
			tIndex=muInfo['title'].index(tStr)
			muInfo['title']=muInfo['title'][0:tIndex]
			ptext=doc.createTextNode(muInfo['title'])
			subTitle.appendChild(ptext)
			subMusic.appendChild(subTitle)
			
			subArtist=doc.createElement("artist")
			tStr=muInfo['artist'][29:30]
			tIndex=muInfo['artist'].index(tStr)
			muInfo['artist']=muInfo['artist'][0:tIndex]
			ptext=doc.createTextNode(muInfo['artist'])
			subArtist.appendChild(ptext)
			subMusic.appendChild(subArtist)
						
			subAlbum=doc.createElement("Album")
			tStr=muInfo['album'][29:30]
			tIndex=muInfo['album'].index(tStr)
			muInfo['album']=muInfo['album'][0:tIndex]
			ptext=doc.createTextNode(muInfo['album'])
			subAlbum.appendChild(ptext)
			subMusic.appendChild(subAlbum)
			
			subYear=doc.createElement("year")
			tStr=muInfo['year'][3:4]
			tIndex=muInfo['year'].index(tStr)
			muInfo['year']=muInfo['year'][0:tIndex]
			ptext=doc.createTextNode(muInfo['year'])
			subYear.appendChild(ptext)
			subMusic.appendChild(subYear)
			
			Id=Id+1
	
	return doc

def getJMusic():
	folder="e:\\Sounds"
	Id=1
	jMu={}
	for f in os.listdir(folder):
		if(f.endswith('.mp3')):

			strId='%s' %Id
			jMu[strId]={}
			
			tmpFile=folder+"\\"+f
			muInfo=getID3(tmpFile)
			
			tStr=muInfo['title'][29:30]
			tIndex=muInfo['title'].index(tStr)
			muInfo['title']=muInfo['title'][0:tIndex]
			muInfo['title']=muInfo['title'].decode('utf-8')
			if(muInfo['title']!=""):
				jMu[strId]['title']=muInfo['title']
			else:
				jMu[strId]['title']=None
				
			tStr=muInfo['artist'][29:30]
			tIndex=muInfo['artist'].index(tStr)
			muInfo['artist']=muInfo['artist'][0:tIndex]
			muInfo['artist']=muInfo['artist'].decode('utf-8')
			if(muInfo['artist']!=""):
				jMu[strId]['artist']=muInfo['artist']
			else:
				jMu[strId]['artist']=None
						
			tStr=muInfo['album'][29:30]
			tIndex=muInfo['album'].index(tStr)
			muInfo['album']=muInfo['album'][0:tIndex]
			muInfo['album']=muInfo['album'].decode('utf-8')
			if(muInfo['album']!=""):
				jMu[strId]['album']=muInfo['album']
			else:
				jMu[strId]['album']=None
			
			tStr=muInfo['year'][3:4]
			tIndex=muInfo['year'].index(tStr)
			muInfo['year']=muInfo['year'][0:tIndex]
			muInfo['year']=muInfo['year'].decode('utf-8')
			if(muInfo['year']!=""):
				jMu[strId]['year']=muInfo['year']
			else:
				jMu[strId]['year']=None
			
			Id=Id+1
	
	return jMu


class AllHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
		requ.content_type='text/xml'
		tmp=getAllMusic()
		requ.write(tmp.toxml())
		return ""

class AllMusicJHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
		requ.content_type='text/json'
		self.req=tfunction.parse_args(requ)
		args=self.req.get_vars
		try:
			callback=str(args['callback'])
		except KeyError:
			callback=None
		if callback!=None:
			tmp=getJMusic()
			tmp= callback + '(' + jsonh.encode(tmp) + ')'
			requ.write(tmp)
		else:
			return "callback function missing!"
		return ""

