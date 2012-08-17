// This block uses developer keys.  For security reasons it cannot be ripped and used in a mashup.

function PhotoViewerClass() 
{
}

PhotoViewerClass.prototype.addPhoto = function(name, desc, source)
{   
	//debugger;
	var s =  "<a href='" + environment.escapeQuotes(source) + "' target='_blank'><img style='width:150px;height:150px' src='" +
           environment.escapeQuotes(source ) + "' title='" +
           environment.escapeQuotes(name ) + ", Description: " + environment.escapeQuotes( desc) + "'/></a>";
	
	environment.output(s);
};
