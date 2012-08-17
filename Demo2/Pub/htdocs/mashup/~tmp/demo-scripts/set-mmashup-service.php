<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$url = (string)@$_POST['url'];
	
	setcookie('mmashup_uri', $url, time() + 31536000);
	$_COOKIE['mmashup_uri'] = $url;
}




function conv($s, $destCharset, $srcCharset = 'utf-8') {
	static $lib = array();

	$destCharset = strtolower($destCharset);
	$srcCharset = strtolower($srcCharset);

	if ($destCharset == $srcCharset)
		return $s;

	if (strpos($srcCharset, 'ucs-2') !== 0) {
		$s = iconv($srcCharset, 'ucs-2be', $s);
		$srcCharset = 'ucs-2be';
	}

	iconv('utf-8', $destCharset, '!');  //  Check if destCharset is valid. 

	$codes = unpack('v*', $s);
	$ret = array();

	foreach ($codes as $code) {
		if (!isset($lib[$destCharset][$code])) {
			$bin = pack('v', $code);
			$tmp = @iconv($srcCharset, $destCharset, $bin);

			if ($tmp == '' || (@iconv($destCharset, $srcCharset, $tmp)) != $bin)
				$ret[] = ($lib[$destCharset][$code] = "&#$code;");
			else
				$ret[] = ($lib[$destCharset][$code] = $tmp);
		}
		else
			$ret[] = $lib[$destCharset][$code];
	}

	return implode('', $ret);
}

	

//	Convert strings to XHTML compatible form. 
function xhtml($s, $destCharset = 'utf-8', $srcCharset = 'utf-8') {
	if (strtolower($srcCharset) != 'utf-8')
		$s = iconv($srcCharset, 'utf-8', $s);

	$s = htmlspecialchars($s, ENT_COMPAT);
	$s = str_replace(
		array(" ", "\r\n", "\r", "\n"),
		array('&#160;', "\n", "\n", "<br />"),
		$s);

	$s = conv($s, $destCharset);

	return $s;

	/*return str_replace(
		array('&', '<', '>', '\'', '"', "  ", "\r\n", "\r", "\n"),
		array('&amp;', '&lt;', '&gt;', '&#039;', '&quot;', '&nbsp;&nbsp;&nbsp;', "\n", "\n", "<br />"),
		$s);*/
}


?>
<?php
echo '<?xml version="1.0" encoding="UTF-8"?' . '>'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>Mobile Mashup Demo</title>
</head>
<body>
    <form id="dbshare" method="post" action="x-cookie">
		<p>Mobile Url: <input type="text" id="url" name="url" value="<?php echo xhtml((string)@$_COOKIE['mmashup_uri']); ?>" /></p>
		<p><input type="submit" value="Share" /></p>
	</form>
</body>
</html>
