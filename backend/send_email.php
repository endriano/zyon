<?php
require __DIR__ . '/config.php';

// Permitir CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit;
}

// Leer datos del body
$input = file_get_contents("php://input");
$data = json_decode($input, true);

$nombre   = trim($data['nombre'] ?? '');
$email    = trim($data['email'] ?? '');
$telefono = trim($data['telefono'] ?? '');
$empresa  = trim($data['empresa'] ?? '');
$mensaje  = trim($data['mensaje'] ?? '');

// Validar campos
if (!$nombre || !$email || !$mensaje) {
    echo json_encode(["success" => false, "message" => "Faltan datos obligatorios"]);
    exit;
}

// Destinatario
$to = RECEIVER_EMAIL; 
$subject = "📩 Nuevo mensaje de contacto - AB8 Marine";

// Cabeceras
$headers  = "From: " . SENDER_EMAIL . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Cuerpo HTML del correo
$body = "
<!DOCTYPE html>
<html lang='es'>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: Arial, sans-serif; color:#333; background:#f4f7fa; padding:20px; }
    .container { background:#fff; border-radius:8px; padding:25px; box-shadow:0 3px 8px rgba(0,0,0,0.1); }
    h2 { font-size:20px; color:#024059; margin-bottom:10px; }
    .brand {
      font-size:28px; 
      font-weight:bold; 
      background: linear-gradient(90deg, #049DD9, #0378A6, #024059);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
    }
    .field { margin-bottom:10px; font-size:15px; }
    .label { font-weight:bold; color:#024059; }
    .message { background:#f1f9ff; padding:15px; border-left:4px solid #0378A6; margin-top:20px; white-space:pre-wrap; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='brand'>AB8 Marine</div>
    <h2>📬 Has recibido un nuevo mensaje desde la web</h2>
    <div class='field'><span class='label'>Nombre:</span> $nombre</div>
    <div class='field'><span class='label'>Email:</span> $email</div>
    <div class='field'><span class='label'>Teléfono:</span> " . ($telefono ?: "No proporcionado") . "</div>
    <div class='field'><span class='label'>Empresa:</span> " . ($empresa ?: "No proporcionada") . "</div>
    <div class='message'>$mensaje</div>
  </div>
</body>
</html>
";

// Enviar correo
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["success" => true, "message" => "¡Mensaje enviado con éxito!"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al enviar el correo"]);
}
