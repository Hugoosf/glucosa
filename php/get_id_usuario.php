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
    die(json_encode(['error' => 'Error de conexión: ' . $conn->connect_error]));
}


$data = json_decode(file_get_contents('php://input'), true);
$usuario = $data['usuario'];


$sql = "SELECT idusuario FROM usuarios WHERE usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($idusuario);


if ($stmt->fetch()) {
    echo json_encode(['idusuario' => $idusuario]);
} else {
    echo json_encode(['idusuario' => null]);
}


$stmt->close();
$conn->close();
?>

