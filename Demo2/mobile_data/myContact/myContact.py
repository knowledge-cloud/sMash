def handler(req):
	from mod_python import apache
	import contacts
	import e32db
	import types
	import codecs
	import urllib
	import time
	import inbox
	i = inbox.Inbox()
	m = i.sms_messages()
	req.content_type = 'text/html; charset=UTF-8'
	req.write(i.content(m[0]))
	req.write(i.address(m[0]))
	#req.write("<html>Hello World!<br>")
	db=contacts.open()
	fieldtypes = db.field_types()
	for id in db:
		contact = db[id]
		#req.write(str(contact.id)+'<br>')
		req.write(contact.title)
		#req.write('<br>')
		break
	#req.write(str(len(db)))
	#req.write("</html>")
	return apache.OK