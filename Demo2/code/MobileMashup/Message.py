#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from mod_python import util

import ig_libs
import jsonh
import tfunction
import dictoxml

import time
import codecs
import string
import inbox

def allMessage(req):
    hrh=MessageHandler()
    result=hrh.handler(req)
    req.content_type='text/xml'
    result=dictoxml.dicToXML(result,"Message")
    req.write(result)
    del hrh
    return ""

def allMessageJSON(req):
    hrh=MessageHandler()
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

class MessageHandler(object):
    def _init_(self):
        pass

    def getMessageDic(self):
        i=inbox.Inbox()
        mAll={}
        m=i.sms_messages()
        Id=1
        for item in m:
            ID='%s' %Id
            mAll[ID]={}
            
            content_m=i.content(item)
            content_m=content_m.encode('utf-8')
            mAll[ID]['content']=content_m

            mTime=time.strftime("%H:%M %m/%d/%Y",time.localtime(i.time(item)))
            mTime=mTime.encode('utf-8')
            mAll[ID]['time']=mTime
            
            address=i.address(item)
            address=address.encode('utf-8')
            mAll[ID]['address']=address

            Id=Id+1

        return mAll
        
    def handler(self,requ):
        tmp=self.getMessageDic()
        return tmp
