import contacts

def getContact():
	db=contacts.open()
	print db[84].find()

getContact()