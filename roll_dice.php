<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $diceResult = rand(1, 6);
    echo $diceResult;
    exit; 
}
?>

