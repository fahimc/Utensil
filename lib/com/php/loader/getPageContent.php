<?php
$page =urldecode ($_POST["url"]);
$file = file_get_contents($page, true);
echo rawurlencode($file);
?>