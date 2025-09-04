<?php
// scripts/send_email.php
// Este script recibe datos JSON como argumento y envía un correo.

// Verificar si se recibió un argumento (debe ser el JSON)
if ($argc < 2) {
    echo json_encode(['success' => false, 'message' => 'No se recibieron datos.']);
    exit(1);
}

// Obtener el JSON del primer argumento
$inputDataJson = $argv[1];

// Decodificar el JSON
$formData = json_decode($inputDataJson, true);

// Verificar si la decodificación fue exitosa
if (json_last_error() !== JSON_ERROR_NONE || !$formData) {
    error_log("Error al decodificar JSON en PHP: " . json_last_error_msg() . ". Recibido: " . $inputDataJson);
    echo json_encode(['success' => false, 'message' => 'Error al procesar los datos.']);
    exit(1);
}

// --- CARGAR PHPMAILER ---
// Asegúrate de haber ejecutado 'composer require phpmailer/phpmailer' en la consola de Replit
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// --- EXTRAER Y VALIDAR DATOS DEL FORMULARIO ---
$name = trim($formData['name'] ?? '');
$email = trim($formData['email'] ?? '');
$phone = trim($formData['phone'] ?? 'No proporcionado');
$subject_key = $formData['subject'] ?? 'otro'; // Valor por defecto
$message_text = trim($formData['message'] ?? '');

if (empty($name) || empty($email) || empty($subject_key) || empty($message_text)) {
    error_log("Datos del formulario incompletos: Name='$name', Email='$email', Subject='$subject_key', Message='$message_text'");
    echo json_encode(['success' => false, 'message' => 'Datos del formulario incompletos.']);
    exit(1);
}

// --- MAPEO DE ASUNTOS ---
$subjects_map = [
    'venta' => '[Consulta de Venta]',
    'mantenimiento' => '[Servicio de Mantenimiento]',
    'otro' => '[Consulta General]'
];
$subject_prefix = $subjects_map[$subject_key] ?? $subjects_map['otro'];

$mail_subject = "$subject_prefix Consulta desde la web: $name";

// --- CONTENIDO DEL CORREO ---
$mail_body_html = "
<html>
<head>
    <title>Nuevo Mensaje de Contacto - Zyon Galicia</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .header {
            background-color: #F27C38; /* Color naranja de Zyon */
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            background-color: #f9f9f9;
        }
        .footer {
            padding: 15px;
            background-color: #eee;
            text-align: center;
            font-size: 0.9em;
        }
        hr {
            border: 0;
            height: 1px;
            background: #F27C38; /* Línea naranja */
            margin: 20px 0;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            padding: 5px 0;
        }
        strong {
            color: #F27C38; /* Texto en negrita naranja */
        }
    </style>
</head>
<body>
    <div class='header'>
        <h1>Nuevo mensaje de Contacto</h1>
        <p>Desde el formulario de la web de Zyon Galicia</p>
    </div>
    <div class='content'>
        <h2>Detalles del mensaje:</h2>
        <ul>
            <li><strong>Nombre:</strong> " . htmlspecialchars($name) . "</li>
            <li><strong>Email:</strong> " . htmlspecialchars($email) . "</li>
            <li><strong>Telefono:</strong> " . htmlspecialchars($phone) . "</li>
            <li><strong>Asunto:</strong> " . htmlspecialchars($subject_prefix) . "</li>
        </ul>
        <hr>
        <h2>Mensaje:</h2>
        <p>" . nl2br(htmlspecialchars($message_text)) . "</p>
    </div>
    <div class='footer'>
        <p><em>Este mensaje fue enviado automaticamente desde el formulario de contacto de la web de Zyon Galicia.</em></p>
    </div>
</body>
</html>
";

$mail_body_text = "
Has recibido un nuevo mensaje desde el formulario de contacto.

Detalles del mensaje:
--------------------
Nombre: $name
Email: $email
Telefono: $phone
Asunto: $subject_prefix

Mensaje:
$message_text
--------------------
Este mensaje fue enviado automaticamente desde el formulario de contacto de la web de Zyon Galicia.
";

// --- CONFIGURACIÓN Y ENVÍO CON PHPMAILER ---
$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP de Gmail
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'endryhdez@gmail.com'; // Tu correo
    $mail->Password   = 'vhiy qrrx gaot ixlw'; // Tu contraseña de aplicación
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Configuración de remitente y destinatario
    $mail->setFrom('endryhdez@gmail.com', 'Formulario web Zyon Galicia');
    $mail->addAddress('endry@fmetal.es'); // Correo del destinatario

    // Configuración del contenido del correo
    $mail->isHTML(true);
    $mail->Subject = $mail_subject;
    $mail->Body    = $mail_body_html;
    $mail->AltBody = $mail_body_text;

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado con éxito']);

} catch (Exception $e) {
    // Registrar el error específico de PHPMailer
    error_log("Error de PHPMailer al enviar correo: " . $mail->ErrorInfo);
    // Devolver un mensaje genérico al usuario
    echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje. Por favor, inténtalo más tarde.']);
    exit(1); // Código de error para el proceso
}

?>