<?php 
    $host = "localhost";
    $user = "root";
    $pass = "root";
    $db = "phpclass";
    $connect = new mysqli($host, $user, $pass, $db);
    $connect -> set_charset("utf8"); //한글 깨지지말라고 써줌

    // if(mysqli_connect_errno()) { //에러 잡아줌
    //     echo "Database Connect False";
    // } else {
    //     echo "Database Connect True";
    // }
?>