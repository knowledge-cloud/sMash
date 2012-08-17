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
	
def search(req):
	hrh=ContactHandler()
	result=hrh.handler(req)
	del hrh
	return result
	
def show(req):
	hrh=ShowHandler()
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
		if db[ID].find('first_name'):
			firstName=doc.createElement("first_name")
			firstName.setAttribute("className","people.first_name")
			ptext=doc.createTextNode(db[ID].find('first_name')[0].value)
			firstName.appendChild(ptext)
			contact.appendChild(firstName)
		if db[ID].find('last_name'):
			lastName=doc.createElement("last_name")
			lastName.setAttribute("className","people.last_name")
			ptext=doc.createTextNode(db[ID].find('last_name')[0].value)
			lastName.appendChild(ptext)
			contact.appendChild(lastName)
		if db[ID].find('email_address'):
			emailAddr=doc.createElement("email_address")
			emailAddr.setAttribute("className","people.email_address")
			ptext=doc.createTextNode(db[ID].find('email_address')[0].value)
			emailAddr.appendChild(ptext)
			contact.appendChild(emailAddr)
		if db[ID].find('mobile_number'):
			mobileNum=doc.createElement("mobile_number")
			mobileNum.setAttribute("className","people.mobile_number")
			ptext=doc.createTextNode(db[ID].find('mobile_number')[0].value)
			mobileNum.appendChild(ptext)
			contact.appendChild(mobileNum)
		if db[ID].find('phone_number'):
			phoneNum=doc.createElement("phone_number")
			phoneNum.setAttribute("className","people.phone_number")
			ptext=doc.createTextNode(db[ID].find('phone_number')[0].value)
			phoneNum.appendChild(ptext)
			contact.appendChild(phoneNum)
		if db[ID].find('country'):
			country=doc.createElement("country")
			country.setAttribute("className","people.country")
			ptext=doc.createTextNode(db[ID].find('country')[0].value)
			country.appendChild(ptext)
			contact.appendChild(country)
		if db[ID].find('city'):
			city=doc.createElement("city")
			city.setAttribute("className","people.city")
			ptext=doc.createTextNode(db[ID].find('city')[0].value)
			city.appendChild(ptext)
			contact.appendChild(city)
		if db[ID].find('job_title'):
			job_title=doc.createElement("job_title")
			job_title.setAttribute("className","people.job_title")
			ptext=doc.createTextNode(db[ID].find('job_title')[0].value)
			job_title.appendChild(ptext)
			contact.appendChild(job_title)
		if db[ID].find('company_name'):
			company_name=doc.createElement("company_name")
			company.setAttribute("className","people.company")
			ptext=doc.createTextNode(db[ID].find('company_name')[0].value)
			company_name.appendChild(ptext)
			contact.appendChild(company_name)
		if db[ID].find('fax_number'):
			fax_number=doc.createElement("fax_number")
			fax_number.setAttribute("className","people.fax_number")
			ptext=doc.createTextNode(db[ID].find('fax_number')[0].value)
			fax_number.appendChild(ptext)
			contact.appendChild(fax_number)
		if db[ID].find('street_address'):
			street_address=doc.createElement("street_address")
			street_address.setAttribute("className","people.street_address")
			ptext=doc.createTextNode(db[ID].find('street_address')[0].value)
			street_address.appendChild(ptext)
			contact.appendChild(street_address)
		if db[ID].find('postal_code'):
			postal_code=doc.createElement("postal_code")
			postal.setAttribute("className","people.postal_code")
			ptext=doc.createTextNode(db[ID].find('postal_code')[0].value)
			postal_code.appendChild(ptext)
			contact.appendChild(postal_code)
		if db[ID].find('url'):
			url=doc.createElement("url")
			url.setAttribute("className","people.url")
			ptext=doc.createTextNode(db[ID].find('url')[0].value)
			url.appendChild(ptext)
			contact.appendChild(url)
		if db[ID].find('date'):
			birthday=doc.createElement("date")
			birthday.setAttribute("className","people.birthday")
			ptext=doc.createTextNode(db[ID].find('date')[0].value)
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
		try:
			email_address=str(args['email_address'])
		except KeyError:
			email_address=None
		if email_address!=None:
			db=contacts.open()
			type="email_address"
			value=email_address
			id=searchId(value,type)
			if id!=None:
				requ.content_type='text/xml'
				tmp=getContact(id)
				requ.write(tmp.toxml('utf-8'))
			else:
				return "contact not found"
		else:
			return "Id missing! input an id to get contact"
		return ""