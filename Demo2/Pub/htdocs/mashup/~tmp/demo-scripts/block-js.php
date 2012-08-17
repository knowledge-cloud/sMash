<?php
error_reporting(E_ALL);

$id = (string)@$_GET['id'];

if (preg_match('/[^a-zA-Z\d-_ \(\)]/', $id))
	$id = '';
?>
framework.registerBlockType('<?php echo addslashes($id); ?>',
<?php
@include '../blocks/' . $id . '.js';

?>
);
