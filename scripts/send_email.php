<?php
// scripts/send_email.php
if ($argc < 2) {
    echo json_encode(['success' => false, 'message' => 'No se recibieron datos del formulario.']);
    exit(1);
}

$jsonDataString = $argv[1]; // <-- Aquí está el cambio

// Decodificar la cadena JSON
$data = json_decode($jsonDataString, true);

// Verificar si la decodificación fue exitosa
if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("Error al decodificar JSON en PHP: " . json_last_error_msg() . ". Cadena recibida: " . $jsonDataString);
    echo json_encode(['success' => false, 'message' => 'Error al procesar los datos del formulario.']);
    exit(1);
}

if (!$data) {
    error_log("Datos decodificados son NULL o falsy. Cadena recibida: " . $jsonDataString);
    echo json_encode(['success' => false, 'message' => 'No se pudieron leer los datos del formulario (después de decodificar).']);
    exit(1);
}
// Cargar el autoloader de Composer
require_once __DIR__ . '/../vendor/autoload.php'; // Ajusta la ruta si es necesario

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Leer datos JSON del STDIN (pasados desde Node.js)
$input = file_get_contents('php://stdin');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No se pudieron leer los datos del formulario.']);
    exit(1); // Código de salida distinto de 0 indica error
}

// Extraer datos
$name = htmlspecialchars(trim($data['name'] ?? ''));
$email = htmlspecialchars(trim($data['email'] ?? ''));
$phone = htmlspecialchars(trim($data['phone'] ?? 'No proporcionado'));
$subject_key = $data['subject'] ?? '';
$message_text = htmlspecialchars(trim($data['message'] ?? ''));

// Validación básica adicional en PHP
if (empty($name) || empty($email) || empty($subject_key) || empty($message_text)) {
     error_log("Datos esenciales faltantes después de decodificar: Name='$name', Email='$email', Subject='$subject_key', Message='$message_text'");
     echo json_encode(['success' => false, 'message' => 'Datos esenciales del formulario faltantes.']);
     exit(1);
}

// --- Configuración de Asuntos y Destinatarios ---
$subjects_map = [
    'venta' => '[Consulta de Venta]',
    'mantenimiento' => '[Servicio de Mantenimiento]',
    'otro' => '[Consulta General]'
];

$to_emails_map = [
    'venta' => 'ehernandez@zyongalicia.com', // Correo para ventas
    'mantenimiento' => 'ehernandez@zyongalicia.com', // Correo para mantenimiento
    'otro' => 'ehernandez@zyongalicia.com' // Correo general
];

// Determinar asunto y destinatario
$subject_prefix = isset($subjects_map[$subject_key]) ? $subjects_map[$subject_key] : '[Consulta General]';
$to_email = isset($to_emails_map[$subject_key]) ? $to_emails_map[$subject_key] : 'ehernandez@zyongalicia.com';

$mail_subject = "$subject_prefix Consulta desde la web: $name";

// --- Configuración de PHPMailer ---
$mail = new PHPMailer(true); // Habilitar excepciones

try {
    // Configuración del servidor SMTP (USANDO GMAIL COMO EJEMPLO - AJUSTA SEGÚN TU PROVEEDOR)
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; // Servidor SMTP de Gmail
    $mail->SMTPAuth   = true;
    $mail->Username   = 'endryhdez@gmail.com'; // Tu correo empresarial
    $mail->Password   = 'vhiy qrrx gaot ixlw';   // Contraseña o App Password de Gmail
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Habilitar encriptación TLS
    $mail->Port       = 587; // Puerto TCP para TLS

    // Configuración de remitente y destinatario
    $mail->setFrom('endryhdez@gmail.com', 'Formulario Web Zyon Galicia'); // Remitente
    $mail->addAddress($to_email); // Añadir destinatario

    // Configuración del contenido del correo
    $mail->isHTML(true); // Establecer formato HTML
    $mail->Subject = $mail_subject;
    $mail->Body    = "
        <html>
        <head>
            <title>Nuevo Mensaje de Contacto</title>
        </head>
        <body>
            <h2>Has recibido un nuevo mensaje desde el formulario de contacto del sitio web de Zyon Galicia.</h2>
            <hr>
            <h3>Detalles del mensaje:</h3>
            <ul>
                <li><strong>Nombre:</strong> {$name}</li>
                <li><strong>Email:</strong> {$email}</li>
                <li><strong>Teléfono:</strong> {$phone}</li>
                <li><strong>Asunto:</strong> {$subject_prefix}</li>
            </ul>
            <h3>Mensaje:</h3>
            <p>{$message_text}</p>
            <hr>
            <p><em>Este mensaje fue enviado automáticamente desde el formulario de contacto de la web.</em></p>
        </body>
        </html>
    ";
    $mail->AltBody = "
        Has recibido un nuevo mensaje desde el formulario de contacto del sitio web de Zyon Galicia.

        Detalles del mensaje:
        --------------------
        Nombre: {$name}
        Email: {$email}
        Teléfono: {$phone}
        Asunto: {$subject_prefix}

        Mensaje:
        {$message_text}
        --------------------
    ";

    $mail->send();
    echo json_encode(['success' => true, 'message' => '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.']);

} catch (Exception $e) {
    // Registrar el error en el log del servidor para diagnóstico
    error_log("Error al enviar correo: " . $mail->ErrorInfo);
    // Devolver un mensaje genérico al usuario por seguridad
    echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje. Por favor, inténtalo más tarde o contáctanos directamente.']);
    exit(1); // Código de salida distinto de 0 indica error
}

?>