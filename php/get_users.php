<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');


$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "glucosareact"; 

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


$sql = "SELECT usuario, nombre, apellidos, fechanac FROM usuarios";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    $users = array();
    
    
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    
    echo json_encode($users);
} else {
    echo json_encode([]);
}


$conn->close();
?>
