#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from mod_python import util

import ig_libs
import jsonh
import tfunction
import dictoxml
import EXIF

import time
import codecs
import string

def queryEXIF(req):
    hrh=ExifHandler()
    result=hrh.handler(req)
    req.content_type='text/xml'
    result=dictoxml.dicToXML(result,"EXIF")
    req.write(result)
    del hrh
    return ""

def queryEXIFJSON(req):
    hrh=ExifHandler()
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

class ExifHandler(object):
    def _init_(self):
        pass

    def getExifDic(self,name):
        tmpfolder="e:\\Images\\"+name+".jpg"
        f=open(tmpfolder,'rb')
        eAll={}
        tags=EXIF.process_file(f)
        Id=1
        ID="%s" %Id
        eAll[ID]={}
        for item in tags.keys():
            if(item!="JPEGThumbnail"):
                content_m=tags[item]
                content_m=str(tags[item])
                item=item.replace(" ","_")
                #content_m=content_m.encode('utf-8')
                eAll[ID][item]=content_m
            
        return eAll
        
    def handler(self,requ):
        self.req=tfunction.parse_args(requ)
        args=self.req.get_vars
        try:
            name=str(args['name'])
        except KeyError:
            name=None
        if(name!=None):
            tmp=self.getExifDic(name)
        else:
            tmp="file name pram missing! file is e:\\Images!"
        return tmp
