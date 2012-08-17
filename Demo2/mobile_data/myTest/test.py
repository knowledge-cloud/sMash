def handler(req):
	from mod_python import apache
	import contacts
	import e32db
	import types
	import codecs
	import urllib
	import time
	req.content_type = 'text/html; charset=UTF-8'
	req.write("<html>Hello World!<br>")
	db=contacts.open()
	for id in db:
		contact = db[id]
		req.write(str(contact.id)+'<br>')
		req.write(contact.title+'<br>')
	req.write(str(len(db)))
	req.write("</html>")
	return apache.OK