<?php

$id = $argv[1];

$tod = date("Y-m-d H:i:s");

$url = 'http://localhost/register/api/Sales/getone/'.$id.'.json';
$data = getUrlContent($url, $id);
$sale = json_decode($data, true);

$url = 'http://localhost/register/api/Transactions/SalesId/'.$id.'.json';
$data = getUrlContent($url, $id);
$trans = json_decode($data, true);

echo PHP_EOL;

echo "  EMPSON'S CRAFT SUPPLIES  " . PHP_EOL;
echo "      POPPY's ATTICT       " . PHP_EOL;
echo PHP_EOL;
echo "Sale ID: " . $id . PHP_EOL;
echo "Associate: " . $sale['sale']['employee']['name'];
echo PHP_EOL;
echo "Customer : " . $sale['sale']['customer']['name'];
echo PHP_EOL;
echo PHP_EOL;
echo "Qty  Name           Price  " . PHP_EOL; 
echo "---------------------------" . PHP_EOL;

foreach ( $trans as $tran ) {
    foreach ( $tran as $value ) {
		echo str_pad($value['quantity'], 4); 
		echo $value['product']['name'] . PHP_EOL;
		echo "                 $" . $value['amount'];
		echo PHP_EOL;
	}	
}

echo PHP_EOL;
echo "---------------------------" . PHP_EOL;
echo "            Tax: $" . $sale['sale']['tax'] . PHP_EOL;
echo "            Sub: $" . $sale['sale']['subtotal'] . PHP_EOL;
echo "          Total: $" . $sale['sale']['amount'] . PHP_EOL;
echo "---------------------------" . PHP_EOL;
echo "           Cash: $" . $sale['sale']['cash'] . PHP_EOL;
echo "         Change: $" . $sale['sale']['chnge'] . PHP_EOL;
echo PHP_EOL;

exit;

function getUrlContent($url, $id){
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    
    $data = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    curl_close($ch);
    
    return ($httpcode>=200 && $httpcode<300) ? $data : false;
}

?>
