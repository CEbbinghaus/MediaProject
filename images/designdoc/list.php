<?php
header('Content-Type: application/json');
$arr = array();
$obj = new \stdClass();
$obj->Data = $arr;
foreach (glob("*.{png,jpg,jpeg,gif}", GLOB_BRACE) as $image) {
  $o = new \stdClass();
  $o->Name = $image;
  array_push($obj->Data, $o);
}
// phpinfo()
echo json_encode($obj);
?>