<?php
 // Cross-Origin Resource Sharing Header
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
function _API_GetInstagram($url) { 
    $opts = array('http' => array('method' => 'POST', 'header' => 'Content-type: application/x-www-form-urlencoded')); 
    $context = stream_context_create($opts); 
    $result = file_get_contents($url, false, $context); 
    return $result;
}
//file_get_contents($url, false, $context)
// $url = $_POST['url'];
$url = 'https://www.instagram.com/rockychen1020/channel?__a=1';
$return_data = json_decode(_API_GetInstagram($url));
var_dump($return_data->graphql->user->edge_owner_to_timeline_media->edges);

// return false;
// foreach($return_data->graphql->user->edge_owner_to_timeline_media->edges as $value) {
//     var_dump($value->node);
//     // echo json_encode($value->node->thumbnail_src)."<br>";
// }
