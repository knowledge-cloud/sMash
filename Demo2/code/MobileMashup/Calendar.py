#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from mod_python import util

import ig_libs
import jsonh
import e32calendar
import tfunction
import dictoxml

import time
import codecs
import string

def allEvents(req):
    hrh=EventsHandler()
    result=hrh.handler(req)
    req.content_type='text/xml'
    result=dictoxml.dicToXML(result,"Contact")
    req.write(result)
    del hrh
    return ""

def allEventsJSON(req):
    hrh=EventsHandler()
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

class EventsHandler(object):
    def _init_(self):
        pass

    def getEventsDic(self,start,end):
        temp=start.split('/')
        i=0
        start_t=[]
        for num in temp:
            start_t.insert(i,string.atoi(num))
            i=i+1
        for i in range(3,9):
            start_t.insert(i,0)
            i=i+1
        temp=end.split('/')
        i=0
        end_t=[]
        for num in temp:
            end_t.insert(i,string.atoi(num))
            i=i+1
        for i in range(3,9):
            end_t.insert(i,0)
            i=i+1
        start_t=tuple(start_t)
        end_t=tuple(end_t)
        start_t=time.mktime(start_t)
        end_t=time.mktime(end_t)
        db=e32calendar.open()
        entries=db.find_instances(start_t,end_t,u"")
        events={}
        Id=1
        for i in entries:
            ID='%s' %Id
            events[ID]={}
            description=db[i["id"]].content
            description=description.encode('utf-8')
            events[ID]['description']=description

            dTime=time.strftime("%H:%M %m/%d/%Y", time.localtime(db[i["id"]].start_time))
            dTime=dTime.encode('utf-8')
            events[ID]['start_time']=dTime

            dTime=time.strftime("%H:%M %m/%d/%Y", time.localtime(db[i["id"]].end_time))
            dTime=dTime.encode('utf-8')
            events[ID]['end_time']=dTime

            Id=Id+1

        return events

    
    def handler(self,requ):
        self.req=tfunction.parse_args(requ)
        args=self.req.get_vars
        flag=1
        try:
            start=str(args['start'])
            end=str(args['end'])
        except KeyError:
            start=None
            end=None
            flag=-1
        if(flag==1):
            tmp=self.getEventsDic(start,end)
        elif(flag==-1):
            tmp="start time or end time missing!"
        return tmp
