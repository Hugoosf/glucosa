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
$nombre = $data['nombre'];
$apellidos = $data['apellidos'];
$fechanac = $data['fechanac'];
$contrasena = $data['contrasena'];


if (empty($usuario) || empty($nombre) || empty($apellidos) || empty($fechanac) || empty($contrasena)) {
    echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios."]);
    exit;
}


$stmt = $conn->prepare("INSERT INTO usuarios (usuario, nombre, apellidos, fechanac, contrasena) 
                        VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $usuario, $nombre, $apellidos, $fechanac, $contrasena);


if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Usuario creado con éxito"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
}


$stmt->close();
$conn->close();
?>

