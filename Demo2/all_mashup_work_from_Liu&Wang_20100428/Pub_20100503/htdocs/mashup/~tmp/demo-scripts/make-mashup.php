<?php

error_reporting(E_ALL);

$mashupRawConfig = (string)@$_GET['map'];
$blockTypes = (string)@($_GET['ref']);

if (get_magic_quotes_gpc()) {
	$mashupRawConfig = stripslashes($mashupRawConfig);
	$blockTypes = stripslashes($blockTypes);
}


/*
header('Location: http://127.0.0.1/MobileMashup/mashup-proxy.py?' . http_build_query($_GET));
exit;
//*/


$ig['host'] = implode('',
	array('http://',
		$_SERVER['HTTP_HOST'] != '' ? $_SERVER['HTTP_HOST']
			: $_SERVER['SERVER_NAME'] != '' ? $_SERVER['SERVER_NAME']
			: $_SERVER['SERVER_ADDR'],
		$_SERVER['SERVER_PORT'] != 80 ? ':' . $_SERVER['SERVER_PORT'] :  ''));




//  Check for security concerns. 
//$mashupRawConfig = str_replace("\r\n", ' ', $mashupRawConfig);
//$mashupRawConfig = str_replace("\r", ' ', $mashupRawConfig);
//$mashupRawConfig = str_replace("\n", ' ', $mashupRawConfig);
//
//$tmp = $mashupRawConfig;
//$tmp = str_replace('\\\\', '', $mashupRawConfig);
//$tmp = str_replace('\\\"', '', $mashupRawConfig);
//$tmp = str_replace('\\\'', '', $mashupRawConfig);
//$tmp = preg_replace('/\s+/', '', $mashupRawConfig);
//$tmp = preg_replace('/"[^"]+"/', '', $mashupRawConfig);
//$tmp = preg_replace('/\'[^\']+\'/', '', $mashupRawConfig);
//$tmp = preg_replace('/"[^"]+"/', '', $mashupRawConfig);
//
//if (preg_match('/if|do|break|continue|else|case|while|switch|for|return|function|eval|;/i', $tmp)) {
//	$mashupRawConfig = '[]';
//}
//
//if (preg_match('/[^a-zA-Z\d-_ \(\)\|]/', $blockTypes))
//	$blockTypes = '';


$blockTypes = explode('|', $blockTypes);

?>
<<?php ?>?xml version="1.0" encoding="UTF-8"?<?php ?>>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>Mashup Runtime Page</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="css/css0.css" />
<!--script type="text/javascript">var SWF_URL = 'js/fhr.swf';</script-->
<!--script type="text/javascript" src="js/fhr.js"></script-->
<!--script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true&amp;region=CN"></script-->
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/json2.js"></script>
<script type="text/javascript" src="js/md5.js"></script>
<script type="text/javascript" src="js/framework.js"></script>
<script type="text/javascript" src="js/mapuri.js"></script>
<script type="text/javascript" src="js/node.js"></script>
<script type="text/javascript">var framework = new Framework();</script>
<?php

foreach ($blockTypes as $blockType) {
?>
<script type="text/javascript" src="block/<?php echo rawurlencode($blockType); ?>/script"></script>
<?php
}
?>
<script type="text/javascript">
//<![CDATA[
var diagramConfig = 
<?php
echo $mashupRawConfig;
?>
;

window.onload = function() {
	framework.initialize(diagramConfig);framework.beginExecution();
};

//]]>
</script>
</head>
<body>
	<div id="display"></div>
</body>
</html>
