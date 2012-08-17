<html>

<head>
	<TITLE> Mashup Result </TITLE>
	<script language="JavaScript" type="text/javascript" src="./Support/environment.js"></script>
	<script language="JavaScript" type="text/javascript" src="./Support/componentManager.js"></script>
	<script language="JavaScript" type="text/javascript" src="./Support/TileJSLib.js"></script>
	<div id="jsLib">
	<% out.print(request.getAttribute("jsSrc").toString());%>
	</div>
  	<script language="JavaScript" type="text/javascript">
	  function startLTD()
	  {
	 	var s = document.getElementById("content").value;
 		startLoadTileData(s);
	  }
</script>			
</head>
<body bgcolor="white" onload="startLTD()">
	<div id="page_load" 
     style="margin-top:200px;margin-left:100px;text-align:center;z-index:10;position:absolute;width:100px ;height:50px; border:1px ">
		 <table>
	 		<tr><td>Loading data, please wait... <img src="./images/progress.gif"/></td></tr>
		 </table>
	</div>
	<input name="content" id="content" type="hidden" value="<%out.print(request.getParameter("MPIs")); %>">	
	<div id="divOutput">
	
	</div>
 </body>
</html>

