<?php
if($_GET){
	file_put_contents("data.txt", $_GET);

	$result = array(
		'stat' => 'ok',
		'photos' => array(
			array(
				'id'		=> 1,
				'title'		=> 'hello',
				'mediumUrl' => '',
				'url'		=> '',
			),
			array(
				'id'		=> 2,
				'title'		=> 'world',
				'mediumUrl' => '',
				'url'		=> '',
			),
		)
	);

	$json = json_encode($result);
	file_put_contents("json.txt", $json);
	echo $json;
}
