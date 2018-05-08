<?php
  header('Access-Control-Allow-Origin: *');  
  $ret = new \stdClass();
  $ret->position = rand (1,4);

  $retJSON = json_encode($ret);

  echo $retJSON;
?>