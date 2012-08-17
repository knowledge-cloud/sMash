// JavaScript file for Flickr block.
// Added by phang.aaron@gmail.com on 2009/12/13
function FlickrClass() {
    this.DEFAULT_MAX_PHOTOS = 30;
    this.apiKey = "afc4baa86825a696128a1e43a00bdcf2";
}

FlickrClass.prototype.getNsid = function(){
	var tmp=window.document.getElementById("flickr");
	var xmlDoc=tmp.contentWindow.document;
	var nsid = xmlDoc.firstChild.firstChild.getAttribute("nsid");
	
	return nsid;
}