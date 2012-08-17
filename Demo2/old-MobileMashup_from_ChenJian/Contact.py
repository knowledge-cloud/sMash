from mod_python import util
import contacts
import time
import xml
from xml.dom.minidom import Document

def handler(req):
	req.content_type='text/html'
	req.write('<body>ousfewy</body>')
	db=contacts.open()
	lens='%s' %len(db)
	req.write(lens)
	return ""
	
def allContacts(req):
	hrh=ContactsHandler()
	result=hrh.handler(req)
	del hrh
	return result
	
def contact(req):
	hrh=ContactHandler()
	result=hrh.handler(req)
	del hrh
	return result

def getContact(id):
	doc=Document()
	wml=doc.createElement("result")
	wml.setAttribute("stat","ok")
	doc.appendChild(wml)
	db=contacts.open()
	try:
		contact=doc.createElement("contact")
		contact.setAttribute("id",id)
		wml.appendChild(contact)
		ID=int(id)
		if db[ID].find('first_name'):
			firstName=doc.createElement("first_name")
			ptext=doc.createTextNode(db[ID].find('first_name')[0].value)
			firstName.appendChild(ptext)
			contact.appendChild(firstName)
		if db[ID].find('last_name'):
			lastName=doc.createElement("last_name")
			ptext=doc.createTextNode(db[ID].find('last_name')[0].value)
			lastName.appendChild(ptext)
			contact.appendChild(lastName)
		if db[ID].find('email_address'):
			emailAddr=doc.createElement("email_address")
			ptext=doc.createTextNode(db[ID].find('email_address')[0].value)
			emailAddr.appendChild(ptext)
			contact.appendChild(emailAddr)
		if db[ID].find('mobile_number'):
			mobileNum=doc.createElement("mobile_number")
			ptext=doc.createTextNode(db[ID].find('mobile_number')[0].value)
			mobileNum.appendChild(ptext)
			contact.appendChild(mobileNum)
		if db[ID].find('phone_number'):
			phoneNum=doc.createElement("phone_number")
			ptext=doc.createTextNode(db[ID].find('phone_number')[0].value)
			phoneNum.appendChild(ptext)
			contact.appendChild(phoneNum)
	except Error:
		er=doc.createElement("err")
		er.setAttribute("code","404")
		er.setAttribute("msg","id not correct")
	return doc
	
def getContacts():
	doc=Document()
	wml=doc.createElement("result")
	wml.setAttribute("stat","ok")
	doc.appendChild(wml)
	db=contacts.open()
	for id in db:
		subContact=doc.createElement("contact")
		ID='%s' %db[id].id
		subContact.setAttribute("id",ID)
		wml.appendChild(subContact)
		if db[id].find('first_name'):
			subFirstName=doc.createElement("first_name")
			ptext=doc.createTextNode(db[id].find('first_name')[0].value)
			subFirstName.appendChild(ptext)
			subContact.appendChild(subFirstName)
		if db[id].find('last_name'):
			subLastName=doc.createElement("last_name")
			ptext=doc.createTextNode(db[id].find('last_name')[0].value)
			subLastName.appendChild(ptext)
			subContact.appendChild(subLastName)
		if db[id].find('email_address'):
			subEmailAddr=doc.createElement("email_address")
			ptext=doc.createTextNode(db[id].find('email_address')[0].value)
			subEmailAddr.appendChild(ptext)
			subContact.appendChild(subEmailAddr)
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

class ContactHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
		self.req=self.parse_args(requ)
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
	
	def parse_args(self,req):
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