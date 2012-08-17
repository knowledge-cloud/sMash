// This block uses developer keys.  For security reasons it cannot be ripped and used in a mashup.

function InfoDisplayClass() 
{
}

InfoDisplayClass.prototype.showInfo = function(title, url, imageUrl, desc)
{   
	//debugger;
	var html = "";
    html += "<table border='1'>" + "\n";
    html += "<tr>" + "\n";
    html += "<td><strong>" + environment.escapeQuotes(title) +"</strong></td>\n";
    html += "</tr>" + "\n";
    html += "<tr>" + "\n";
    html += "<td>" + "<a href='" + environment.escapeQuotes(url)+ "' target='_blank'>" + environment.escapeQuotes(url) + "</td>\n";
    html += "</tr>" + "\n";
    html += "<td>" + environment.escapeQuotes(desc) +"</td>\n";
    html += "</tr>" + "\n";
    if(imageUrl != '' && imageUrl != null && imageUrl != 'undefined'){
	    html += "<tr>" + "\n";
    	html += "<td>" + "<img style='width:150px;height:150px' src='" + environment.escapeQuotes(imageUrl ) + "'/></td>\n";
	    html += "</tr>\n";
    }    
    html += "</table>";
    html += "<br><br>"	
	environment.output(html);
};
