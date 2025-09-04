<?php
// scripts/send_email.php

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

// --- CARGAR VARIABLES DE ENTORNO Y PHPMAILER ---
require_once __DIR__ . '/../vendor/autoload.php';

// Cargar las variables de entorno desde .env en la raíz del proyecto
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// --- EXTRAER Y VALIDAR DATOS DEL FORMULARIO ---
$name = trim($formData['name'] ?? '');
$email = trim($formData['email'] ?? '');
$phone = trim($formData['phone'] ?? 'No proporcionado');
$subject_key = $formData['subject'] ?? 'otro'; // Valor por defecto
$message_text = trim($formData['message'] ?? '');

// Validación básica
if (empty($name) || empty($email) || empty($subject_key) || empty($message_text)) {
    error_log("Datos del formulario incompletos: Name='$name', Email='$email', Subject='$subject_key', Message='$message_text'");
    echo json_encode(['success' => false, 'message' => 'Datos del formulario incompletos.']);
    exit(1);
}

// Validación adicional del email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    error_log("Formato de email inválido proporcionado: $email");
    echo json_encode(['success' => false, 'message' => 'El formato del email no es válido.']);
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
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #F27C38; /* Color naranja de Zyon */
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .content {
            padding: 30px;
            background-color: #f9f9f9;
        }
        .footer {
            padding: 20px;
            background-color: #eee;
            text-align: center;
            font-size: 0.85em;
            color: #666;
        }
        hr {
            border: 0;
            height: 1px;
            background: #F27C38; /* Línea naranja */
            margin: 25px 0;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        li:last-child {
            border-bottom: none;
        }
        strong {
            color: #F27C38; /* Texto en negrita naranja */
            min-width: 100px;
            display: inline-block;
        }
        p {
            margin: 10px 0;
        }
        h1, h2, h3 {
            margin-top: 0;
        }
        a {
            color: #F27C38;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Nuevo Mensaje de Contacto</h1>
            <p>Desde el formulario de la web de Zyon Galicia</p>
        </div>
        <div class='content'>
            <h2>Detalles del mensaje:</h2>
            <ul>
                <li><strong>Nombre:</strong> " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</li>
                <li><strong>Email:</strong> <a href='mailto:" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "'>" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</a></li>
                <li><strong>Teléfono:</strong> " . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . "</li>
                <li><strong>Asunto:</strong> " . htmlspecialchars($subject_prefix, ENT_QUOTES, 'UTF-8') . "</li>
            </ul>
            <hr>
            <h2>Mensaje:</h2>
            <p>" . nl2br(htmlspecialchars($message_text, ENT_QUOTES, 'UTF-8')) . "</p>
        </div>
        <div class='footer'>
            <p><em>Este mensaje fue enviado automáticamente desde el formulario de contacto de la web de <a href='https://www.zyongalicia.com'>Zyon Galicia</a>.</em></p>
            <p>Zyon Galicia S.L. - Polígono Industrial de Amoedo Parcela 2B- Zona C- Sección B, 36841 Pazos de Borbén, Pontevedra, España</p>
        </div>
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
Zyon Galicia S.L. - Polígono Industrial de Amoedo Parcela 2B- Zona C- Sección B, 36841 Pazos de Borbén, Pontevedra, España
";

// --- CONFIGURACIÓN Y ENVÍO CON PHPMAILER ---
$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP de Gmail
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['EMAIL_USER']; // Usuario desde .env
    $mail->Password   = $_ENV['EMAIL_PASS'];  // Contraseña/App Password desde .env
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8'; // Asegurar codificación UTF-8

    // Configuración de remitente y destinatario
    $mail->setFrom($_ENV['EMAIL_USER'], 'Formulario web Zyon Galicia'); // Remitente desde .env
    $mail->addAddress($_ENV['RECEIVER_EMAIL']); // Destinatario desde .env

    // Configuración del contenido del correo
    $mail->isHTML(true);                                  // Establecer formato HTML
    $mail->Subject = $mail_subject;
    $mail->Body    = $mail_body_html;
    $mail->AltBody = $mail_body_text;

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado con éxito.']);

} catch (Exception $e) {
    // Registrar el error específico de PHPMailer de forma segura
    error_log("Error de PHPMailer al enviar correo: " . $mail->ErrorInfo);
    // Devolver un mensaje genérico al usuario para no revelar detalles internos
    echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje. Por favor, inténtalo más tarde.']);
    // No hacemos exit(1) aquí porque queremos que Node.js maneje la respuesta HTTP con el código 200 pero success=false
    exit(1); // Pero sí salimos con error para que Node.js lo capture
}

?>