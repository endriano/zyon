<?php
// contact_form_handler.php
// Script PHP para manejar el formulario de contacto y enviar correo usando PHPMailer.

// --- PERMITIR CORS (Importante para llamadas AJAX desde el navegador) ---
header("Access-Control-Allow-Origin: https://zyongalicia.com"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json'); // Asegurar que la respuesta sea JSON

// Manejar solicitud OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verificar método HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // 405 Method Not Allowed
    echo json_encode(["success" => false, "message" => "Método no permitido. Solo se aceptan solicitudes POST."]);
    exit();
}

// --- CARGAR VARIABLES DE ENTORNO (.env) ---
// Intenta cargar Dotenv si Composer está disponible
$dotenv_loaded = false;
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
    if (class_exists('Dotenv\Dotenv')) {
        // Cargar .env desde el mismo directorio donde está este script
        $dotenv_path = __DIR__; // O __DIR__ . '/..' si lo pones un nivel arriba
        if (file_exists($dotenv_path . '/.env')) {
            $dotenv = Dotenv\Dotenv::createImmutable($dotenv_path);
            $dotenv->load();
            $dotenv_loaded = true;
            error_log("Variables de entorno cargadas desde: " . $dotenv_path . '/.env');
        } else {
             error_log("Archivo .env no encontrado en: " . $dotenv_path);
        }
    } else {
         error_log("Clase Dotenv no encontrada. Asegúrate de haber ejecutado 'composer require vlucas/phpdotenv'");
    }
} else {
     error_log("vendor/autoload.php no encontrado. Asegúrate de haber ejecutado 'composer install'");
}

// Definir constantes con valores por defecto o desde $_ENV si Dotenv falla/no está
define("SENDER_EMAIL", $_ENV['SENDER_EMAIL'] ?? '');
define("SENDER_NAME", $_ENV['SENDER_NAME'] ?? '');
define("RECEIVER_EMAIL", $_ENV['RECEIVER_EMAIL'] ?? '');

// Para SMTP (opcional)
define("SMTP_HOST", $_ENV['SMTP_HOST'] ?? 'localhost');
define("SMTP_PORT", $_ENV['SMTP_PORT'] ?? 25);
define("SMTP_USERNAME", $_ENV['SMTP_USERNAME'] ?? '');
define("SMTP_PASSWORD", $_ENV['SMTP_PASSWORD'] ?? '');
define("SMTP_ENCRYPTION", $_ENV['SMTP_ENCRYPTION'] ?? '');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
// use PHPMailer\PHPMailer\Exception; // Opcional

// --- OBTENER Y PROCESAR DATOS DEL FORMULARIO ---
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Verificar si la decodificación JSON fue exitosa
if (json_last_error() !== JSON_ERROR_NONE || !$data) {
    error_log("Error al decodificar JSON en contact_form_handler.php: " . json_last_error_msg() . ". Recibido: " . $input);
    http_response_code(400); // 400 Bad Request
    echo json_encode(["success" => false, "message" => "Error al procesar los datos del formulario. Formato JSON inválido."]);
    exit();
}

// --- EXTRAER Y VALIDAR DATOS ---
// Ajusta estos nombres de campo a los que realmente envía tu frontend (Home.tsx)
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? 'No proporcionado');
$subject_key = $data['subject'] ?? 'otro'; // Valor por defecto
$message_text = trim($data['message'] ?? '');

// Validación básica de campos obligatorios
if (empty($name) || empty($email) || empty($subject_key) || empty($message_text)) {
    http_response_code(400); // 400 Bad Request
    echo json_encode(["success" => false, "message" => "Por favor, complete todos los campos obligatorios (Nombre, Email, Asunto, Mensaje)."]);
    exit();
}

// Validación de formato de email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // 400 Bad Request
    echo json_encode(["success" => false, "message" => "El formato del correo electrónico no es válido."]);
    exit();
}

// --- MAPEO DE ASUNTOS ---
$subjects_map = [
    'venta' => '[Consulta de Venta]',
    'mantenimiento' => '[Servicio de Mantenimiento]',
    'otro' => '[Consulta General]'
];
$subject_prefix = $subjects_map[$subject_key] ?? $subjects_map['otro'];
$mail_subject = "$subject_prefix Consulta desde la web: $name";

// --- CREAR CONTENIDO DEL CORREO ---
$mail_body_html = "
<!DOCTYPE html>
<html lang='es'>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: Arial, sans-serif; color:#333; background:#f4f7fa; padding:20px; }
    .container { background:#fff; border-radius:8px; padding:25px; box-shadow:0 3px 8px rgba(0,0,0,0.1); }
    h2 { font-size:20px; color:#F27C38; margin-bottom:10px; } /* Color naranja de Zyon */
    .brand {
      font-size:28px; 
      font-weight:bold; 
      color: #F27C38; /* Color naranja de Zyon */
      margin-bottom: 20px;
    }
    .field { margin-bottom:10px; font-size:15px; }
    .label { font-weight:bold; color:#F27C38; } /* Color naranja de Zyon */
    .message { background:#fff5eb; padding:15px; border-left:4px solid #F27C38; margin-top:20px; white-space:pre-wrap; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='brand'>Zyon Galicia</div>
    <h2>📬 Has recibido un nuevo mensaje desde la web</h2>
    <div class='field'><span class='label'>Nombre:</span> " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</div>
    <div class='field'><span class='label'>Email:</span> " . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</div>
    <div class='field'><span class='label'>Teléfono:</span> " . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . "</div>
    <div class='field'><span class='label'>Asunto:</span> " . htmlspecialchars($subject_prefix, ENT_QUOTES, 'UTF-8') . "</div>
    <div class='message'>" . htmlspecialchars($message_text, ENT_QUOTES, 'UTF-8') . "</div>
  </div>
</body>
</html>
";

$mail_body_text = "
Has recibido un nuevo mensaje desde el formulario de contacto de la web de Zyon Galicia.

Detalles del mensaje:
--------------------
Nombre: $name
Email: $email
Teléfono: $phone
Asunto: $subject_prefix

Mensaje:
$message_text
--------------------
Este mensaje fue enviado automáticamente desde el formulario de contacto de la web de Zyon Galicia.
";

// --- CONFIGURACIÓN Y ENVÍO CON PHPMAILER ---
$mail = new PHPMailer(true); // Pasar `true` habilita excepciones

try {
    // --- CONFIGURACIÓN DEL SERVIDOR SMTP ---
    // OPCIÓN 1: Usar mail() de PHP (muy común en hostings compartidos)
    // Esta es la forma más simple y la que suele funcionar.
    $mail->isMail(); 
    // Nota: isMail() no requiere Host, Username, Password, etc.

    // O SI TU HOSTING REQUIERE CONFIGURACIÓN SMTP EXPLÍCITA, USA ESTO EN SU LUGAR:
    /*
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST; // Usando la constante definida arriba
    $mail->SMTPAuth   = false;      // A menudo false para localhost
    $mail->Port       = SMTP_PORT; // Usando la constante definida arriba
    // Si se requiere autenticación:
    // $mail->SMTPAuth   = true;
    // $mail->Username   = SMTP_USERNAME;
    // $mail->Password   = SMTP_PASSWORD;
    // $mail->SMTPSecure = SMTP_ENCRYPTION; // 'tls' o 'ssl'
    */


    // --- CONFIGURACIÓN DE REMITENTE Y DESTINATARIO ---
    $mail->setFrom(SENDER_EMAIL, SENDER_NAME);
    $mail->addAddress(RECEIVER_EMAIL); // Añadir destinatario

    // --- CONFIGURACIÓN DEL CONTENIDO ---
    $mail->isHTML(true); // Establecer formato HTML
    $mail->CharSet = 'UTF-8'; // Codificación
    $mail->Subject = $mail_subject;
    $mail->Body    = $mail_body_html;
    $mail->AltBody = $mail_body_text;

    // --- ENVIAR EL CORREO ---
    $mail->send();
    
    // --- RESPUESTA EXITOSA AL CLIENTE ---
    echo json_encode([
        "success" => true, 
        "message" => "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto."
    ]);

} catch (Exception $e) {
    // --- REGISTRAR ERROR EN EL SERVIDOR ---
    error_log("Error de PHPMailer en contact_form_handler.php (ErrorInfo): " . $mail->ErrorInfo);
    error_log("Excepción de PHPMailer: " . $e->getMessage());

    // --- RESPUESTA DE ERROR GENÉRICA AL CLIENTE ---
    http_response_code(500); // 500 Internal Server Error
    echo json_encode([
        "success" => false, 
        "message" => "Error al enviar el mensaje. Por favor, inténtalo más tarde o contáctanos directamente."
    ]);
}

?>