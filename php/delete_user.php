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


$data = json_decode(file_get_contents("php://input"), true);
$usuario = $data['usuario'];


$sql = "DELETE FROM usuarios WHERE usuario='$usuario'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Usuario eliminado con éxito"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}


$conn->close();
?>
