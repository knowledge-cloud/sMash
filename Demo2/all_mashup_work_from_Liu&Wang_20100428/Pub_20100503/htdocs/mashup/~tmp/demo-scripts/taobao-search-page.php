<?php

$name = (string)@$_GET['name'];

if (get_magic_quotes_gpc()) {
	$name = stripslashes($name);
}

$name = @iconv('utf-8', 'gbk//IGNORE', $name);

header('Location: http://search.taobao.com/search?q=' . $name . '&shopf=newsearch', 302);

?>