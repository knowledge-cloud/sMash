// MobileContact block
// Author: Aaron Phang(phang.aaron@gmail.com)
// Added on 2009/12/12
// This JS file is a block containing functions that can get kinds of mobile data from the Mobile Web Server on the mobile.
// It defines inputs, outputs and functions that the execution engine can use.
function MobileContactClass() {
	// define some default settings.
	this.host = "http://pengzhipeng.mymobilesite.net";
	this.hostdir = "/MobileMashup/Contact.py/";
}

MobileContactClass.prototype.getEmailsByName = function(name) {
	// name = "Aaron Phang"
	var uri = this.host+this.hostdir+"contact?id=996";
	var tmp=window.document.getElementById("contact996");
	var xmlDoc=tmp.contentWindow.document;
	var res = xmlDoc.firstChild;
	var emailNode = res.firstChild.getElementsByTagName('email_address');
	var email_addr=emailNode[0].childNodes[0].nodeValue;
	
	return email_addr;
}