<?php

$data = (string)@$_REQUEST['data'];
$encoding = (string)@$_GET['encoding'];
$callback = (string)@$_GET['callback'];


header('Content-Type: text/javascript; charset=utf-8');

if (get_magic_quotes_gpc()) {
	$data = stripslashes($data);
	$encoding = stripslashes($encoding);
	$callback = stripslashes($callback);
}


$data = str_replace("\\\\\\\\", "\\\\x5c", $data);
$data = str_replace("\\\\\\\'", "\\\\x27", $data);
$data = str_replace("\\\\\\\"", "\\\\x22", $data);


$re = '/"(?:\\\\"|[^"])*"/';

preg_match_all($re, $data, $l1);
$l1 = $l1[0];
$l2 = preg_split($re, $data);


foreach ($l1 as &$tmp) {
	
	$tmp = stripcslashes(substr($tmp, 1, -1));
	$tmp = stripcslashes(substr($tmp, 1, -1));
	$tmp = iconv($encoding, 'utf-8//TRANSLIT', $tmp);
	$tmp = str_replace("\\", "\\\\", $tmp);
	$tmp = str_replace("\"", "\\\"", $tmp);
	$tmp = str_replace("\b", "\\b", $tmp);
	$tmp = str_replace("\f", "\\f", $tmp);
	$tmp = str_replace("\n", "\\n", $tmp);
	$tmp = str_replace("\r", "\\r", $tmp);
	$tmp = str_replace("\t", "\\t", $tmp);

	$tmp = '"' . $tmp . '"';
}

$n = count($l1);

$l = array($l2[0]);

for ($i = 0; $i < $n; $i++) {
	$l[] = $l1[$i];
	$l[] = $l2[$i+1];
}

$data = implode('', $l);
echo addslashes($callback) . '(' . $data . ');';

?>