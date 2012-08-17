#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import xml
from xml.dom.minidom import Document

def getSubItems(dic,subName,doc,att):
    wml=doc.createElement(subName)
    keys=att.keys()
    if(keys!=[]):
        for key in keys:
            wml.setAttribute(key,att[key])
    keys=dic.keys()
    for key in keys:
        subElement=doc.createElement(key)
        try:
            tmp=dic[key].keys()
            for tKey in tmp:
                att={}
                tmpXml=getSubItems(dic[key][tKey],tKey,doc)
                subElement.appendChild(tmpXml)                
        except AttributeError:
            ptext=doc.createTextNode(dic[key])
            subElement.appendChild(ptext)
        wml.appendChild(subElement)
           
    return wml

def dicToXML(dic,subName):
    doc=Document()
    wml=doc.createElement("rsp")
    wml.setAttribute("stat","ok")
    doc.appendChild(wml)
    ids=dic.keys()
    for ID in ids:
        att={}
        att['ID']=ID
        subXml=getSubItems(dic[ID],subName,doc,att)
        wml.appendChild(subXml)

    strs=doc.toxml()
        
    return strs
