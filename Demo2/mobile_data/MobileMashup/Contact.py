import contacts

def allContacts(req):
	hrh=ContactsHandler()
	result=hrh.handler(req)
	del hrh
	return result
	
class ContactsHandler(object):
	def _init_(self):
		pass
	
	def handler(self,requ):
		requ.content_type='text/xml'
		db=contacts.open()
		return "ju"