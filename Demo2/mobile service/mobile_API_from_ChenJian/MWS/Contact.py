#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from mod_python import util
import json
import contacts
import time
import xml
from xml.dom.minidom import Document

def handler(req):
	req.content_type='text/html'
	req.write('<body>我们</body>')
	db=contacts.open()
	lens='%s' %len(db)
	req.write(lens)
	return ""
	
def allContacts(req):
	hrh=ContactsHandler()
	result=hrh.handler(req)
	del hrh
	return result
	
def allContactsJSON(req):
	hrh=ContactsJHandler()
	result=hrh.handler(req)
	del hrh
	return result
	
def search(req):
	hrh=ShowHandler()
	result=hrh.handler(req)
	del hrh
	return result
	
def show(req):
	hrh=ContactHandler()
	result=hrh.handler(req)
	del hrh
	return result

def searchId(value,type):
	db=contacts.open()
	for id in db:
		ID='%s' %db[id].id
		if db[id].find(type):
			if db[id].find(type)[0].value==value:
				return ID
	return None
	
def getContact(id):
	doc=Document()
	wml=doc.createElement("rsp")
	wml.setAttribute("stat","ok")
	doc.appendChild(wml)
	db=contacts.open()
	try:
		contact=doc.createElement("contact")
		contact.setAttribute("id",id)
		wml.appendChild(contact)
		ID=int(id)
		
		firstName=doc.createElement("first_name")
		firstName.setAttribute("className","people.first_name")
		if db[ID].find('first_name'):
			ptext=doc.createTextNode(db[ID].find('first_name')[0].value)
		else:
			ptext=doc.createTextNode("")
		firstName.appendChild(ptext)
		contact.appendChild(firstName)
		
		lastName=doc.createElement("last_name")
		lastName.setAttribute("className","people.last_name")
		if db[ID].find('last_name'):
			ptext=doc.createTextNode(db[ID].find('last_name')[0].value)
		else:
			ptext=doc.createTextNode("")
		lastName.appendChild(ptext)
		contact.appendChild(lastName)
		
		emailAddr=doc.createElement("email_address")
		emailAddr.setAttribute("className","contact.email_address")
		if db[ID].find('email_address'):
			ptext=doc.createTextNode(db[ID].find('email_address')[0].value)
		else:
			ptext=doc.createTextNode("")
		emailAddr.appendChild(ptext)
		contact.appendChild(emailAddr)
		
		mobileNum=doc.createElement("mobile_number")
		mobileNum.setAttribute("className","contact.mobile_number")
		if db[ID].find('mobile_number'):
			ptext=doc.createTextNode(db[ID].find('mobile_number')[0].value)
		else:
			ptext=doc.createTextNode("")
		mobileNum.appendChild(ptext)
		contact.appendChild(mobileNum)
		
		phoneNum=doc.createElement("phone_number")
		phoneNum.setAttribute("className","contact.phone_number")
		if db[ID].find('phone_number'):
			ptext=doc.createTextNode(db[ID].find('phone_number')[0].value)
		else:
			ptext=doc.createTextNode("")
		phoneNum.appendChild(ptext)
		contact.appendChild(phoneNum)

		country=doc.createElement("country")
		country.setAttribute("className","addr.country")
		if db[ID].find('country'):
			ptext=doc.createTextNode(db[ID].find('country')[0].value)
		else:
			ptext=doc.createTextNode("")
		country.appendChild(ptext)
		contact.appendChild(country)
		
		city=doc.createElement("city")
		city.setAttribute("className","addr.city")
		if db[ID].find('city'):
			ptext=doc.createTextNode(db[ID].find('city')[0].value)
		else:
			ptext=doc.createTextNode("")
		city.appendChild(ptext)
		contact.appendChild(city)
		
		job_title=doc.createElement("job_title")
		job_title.setAttribute("className","people.job_title")
		if db[ID].find('job_title'):
			ptext=doc.createTextNode(db[ID].find('job_title')[0].value)
		else:
			ptext=doc.createTextNode("")
		job_title.appendChild(ptext)
		contact.appendChild(job_title)
		
		fax_number=doc.createElement("fax_number")
		fax_number.setAttribute("className","contact.fax_number")
		if db[ID].find('fax_number'):
			ptext=doc.createTextNode(db[ID].find('fax_number')[0].value)
		else:
			ptext=doc.createTextNode("")
		fax_number.appendChild(ptext)
		contact.appendChild(fax_number)
		
		street_address=doc.createElement("street_address")
		street_address.setAttribute("className","addr.street_address")
		if db[ID].find('street_address'):
			ptext=doc.createTextNode(db[ID].find('street_address')[0].value)
		else:
			ptext=doc.createTextNode("")
		street_address.appendChild(ptext)
		contact.appendChild(street_address)
		
		url=doc.createElement("url")
		url.setAttribute("className","people.url")
		if db[ID].find('url'):
			ptext=doc.createTextNode(db[ID].find('url')[0].value)
		else:
			ptext=doc.createTextNode("")
		url.appendChild(ptext)
		contact.appendChild(url)
		
		birthday=doc.createElement("date")
		birthday.setAttribute("className","people.birthday")
		if db[ID].find('date'):
			ptext=doc.createTextNode(db[ID].find('date')[0].value)
		else:
			ptext=doc.createTextNode("")
		birthday.appendChild(ptext)
		contact.appendChild(birthday)
	except:
		er=doc.createElement("err")
		er.setAttribute("code","404")
		er.setAttribute("msg","id not correct")
	return doc

def parse_args(req):
	req.get_vars={}
	try:
		if req.args:
			temp=req.args.split('&')
			for arg in temp:
				arg=arg.split('=')
				req.get_vars[arg[0]]=arg[1]
	except IndexError:
		pass
	req.form=util.FieldStorage(req)
	for i in range(len(req.form.list)):
		req.form.list[i].value=req.form.list[i].value.replace("'","\'")
	return req
		
def getContacts():
	doc=Document()
	wml=doc.createElement("rsp")
	wml.setAttribute("stat","ok")
	doc.appendChild(wml)
	db=contacts.open()
	for id in db:
		subContact=doc.createElement("contact")
		ID='%s' %db[id].id
		subContact.setAttribute("id",ID)
		wml.appendChild(subContact)
		subFirstName=doc.createElement("first_name")
		if db[id].find('first_name'):
			ptext=doc.createTextNode(db[id].find('first_name')[0].value)
		else:
			ptext=doc.createTextNode("")
		subFirstName.appendChild(ptext)
		subContact.appendChild(subFirstName)
		
		subLastName=doc.createElement("last_name")
		if db[id].find('last_name'):
			ptext=doc.createTextNode(db[id].find('last_name')[0].value)
		else:
			ptext=doc.createTextNode("")
		subLastName.appendChild(ptext)
		subContact.appendChild(subLastName)
		
		subEmailAddr=doc.createElement("email_address")
		if db[id].find('email_address'):
			ptext=doc.createTextNode(db[id].find('email_address')[0].value)
		else:
			ptext=doc.createTextNode("")
		subEmailAddr.appendChild(ptext)
		subContact.appendChild(subEmailAddr)
	return doc
	
def getJContacts():
	jContact={}
	db=contacts.open()
	for id in db:
		ID='%s' %db[id].id
		jContact[ID]={}
		
		if db[id].find('first_name'):
			test=db[id].find('first_name')[0].value
			test=test.encode("utf-8")
			jContact[ID]['first_name']=test
		else:
			jContact[ID]['first_name']='null'

		if db[id].find('last_name'):
			test=db[id].find('last_name')[0].value
			test=test.encode("utf-8")
			jContact[ID]['last_name']=test
		else:
			jContact[ID]='null'

		if db[id].find('email_address'):
			jContact[ID]['email_address']=db[id].find('email_address')[0].value
		else:
			jContact[ID]['email_address']='null'
	
	jC=str(jContact)
	return jC
	
def getErr(message):
	doc=Document()
	wml=doc.createElement("rsp")
	wml.setAttribute("stat","error")
	doc.appendChild(wml)

	subN=doc.createElement("message")
	ptext=doc.createTextNode(message)
	subN.appendChild(ptext)
	wml.appendChild(subN)
		
	return doc
class ContactsHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
		requ.content_type='text/xml'
		db=contacts.open()
		tmp=getContacts()
		requ.write(tmp.toxml('utf-8'))
		return ""
		
class ContactsJHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
		requ.content_type='text/json'
		db=contacts.open()
		tmp=getJContacts()
		tmp=tmp.replace("\'","\"")
		requ.write(tmp)
		return ""

class ContactHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
		self.req=parse_args(requ)
		args=self.req.get_vars
		try:
			id=str(args['id'])
		except KeyError:
			id=None
		if id!=None:
			requ.content_type='text/xml'
			db=contacts.open()
			tmp=getContact(id)
			requ.write(tmp.toxml('utf-8'))
		else:
			return "Id missing! input an id to get contact"
		return ""

class ShowHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
		self.req=parse_args(requ)
		args=self.req.get_vars
		type=None
		try:
			email_address=str(args['email_address'])
			type="email_address"
			value=email_address
		except KeyError:
			email_address=None
		try:
			searchQue=str(args['first_name'])
			type="first_name"
			value=searchQue
		except KeyError:
			searchQue=None
		try:
			searchQue=str(args['last_name'])
			type="last_name"
			value=searchQue
		except KeyError:
			searchQue=None
		if type!=None:
			db=contacts.open()
			id=searchId(value,type)
			if id!=None:
				requ.content_type='text/xml'
				tmp=getContact(id)
				requ.write(tmp.toxml('utf-8'))
			else:
				requ.content_type='text/xml'
				message="contact not found!"
				tmp=getErr(message)
				requ.write(tmp.toxml('utf-8'))
		else:
			requ.content_type='text/xml'
			message="attribute not provided correctly!"
			tmp=getErr(message)
			requ.write(tmp.toxml('utf-8'))
		return ""