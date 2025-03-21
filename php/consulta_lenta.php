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
$idusuario = $data['idusuario'];
$mes = $data['mes'];
$tipoConsulta = $data['tipoConsulta'];


$sql = "SELECT lenta, fecha FROM controlglu WHERE idusuario = ? AND MONTH(fecha) = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $idusuario, $mes); 
$stmt->execute();
$result = $stmt->get_result();

$resultados = [];
while ($row = $result->fetch_assoc()) {
    $resultados[] = $row;
}

if ($resultados) {
    $valoresLenta = array_column($resultados, 'lenta');

    switch ($tipoConsulta) {
        case 'media':
            $resultado = array_sum($valoresLenta) / count($valoresLenta);
            break;
        case 'minimo':
            $resultado = min($valoresLenta);
            break;
        case 'maximo':
            $resultado = max($valoresLenta);
            break;
        default:
            $resultado = 'Tipo de consulta no válido';
    }

    echo json_encode(['resultado' => $resultado]);
} else {
    echo json_encode(['resultado' => null]);
}


$stmt->close();
$conn->close();
?>

