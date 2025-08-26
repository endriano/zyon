from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import logging
from datetime import datetime

# Cargar variables de entorno
load_dotenv()

# Configuración básica de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configurar CORS correctamente
CORS(app, 
     origins=["http://localhost:5173", "http://localhost:3000", "https://tu-dominio.replit.co"],
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"],
     supports_credentials=True)

# Configuración del correo (usar variables de entorno)
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SENDER_EMAIL = os.getenv('SENDER_EMAIL', 'endryhdez@gmail.com')
SENDER_PASSWORD = os.getenv('SENDER_PASSWORD', 'vhiy qrrx gaot ixlw')
RECEIVER_EMAIL = os.getenv('RECEIVER_EMAIL', 'endry@fmetal.es')

@app.route('/send_email', methods=['POST'])
def send_email():
    """
    Endpoint para enviar correos desde el formulario de contacto.
    """
    try:
        # Log de inicio
        logger.info("Recibiendo solicitud de envío de email")

        # Obtener datos del cuerpo de la solicitud JSON
        data = request.get_json()
        logger.info(f"Datos recibidos: {data}")

        # Validar que data no sea None
        if not data:
            logger.warning("No se recibieron datos en la solicitud")
            return jsonify({
                "success": False, 
                "message": "No se recibieron datos en la solicitud."
            }), 400

        # Extraer campos con valores por defecto
        nombre = data.get('name', '').strip() if data.get('name') else ''
        email = data.get('email', '').strip() if data.get('email') else ''
        mensaje_usuario = data.get('message', '').strip() if data.get('message') else ''
        telefono = data.get('phone', '').strip() if data.get('phone') else ''
        subject = data.get('subject', '').strip() if data.get('subject') else ''

        # Validación básica del lado del servidor
        if not nombre or not email or not mensaje_usuario:
            logger.warning("Datos de formulario incompletos")
            return jsonify({
                "success": False, 
                "message": "Por favor, complete todos los campos obligatorios (Nombre, Email, Mensaje)."
            }), 400

        # Validación de formato de email
        if not ("@" in email and "." in email):
            logger.warning(f"Formato de email inválido: {email}")
            return jsonify({
                "success": False, 
                "message": "Por favor, ingrese un correo electrónico válido."
            }), 400

        # Crear el mensaje de correo
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Subject'] = f"Nuevo mensaje de contacto: {subject if subject else 'Consulta General'}"

        # Cuerpo del correo mejorado
        cuerpo_correo = f"""
        Has recibido un nuevo mensaje desde el formulario de contacto.

        ================================================
        DETALLES DEL MENSAJE
        ================================================
        Fecha y hora: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}
        Nombre: {nombre}
        Email: {email}
        Telefono: {telefono if telefono else 'No proporcionado'}
        Asunto: {subject if subject else 'No especificado'}

        MENSAJE:
        {mensaje_usuario}
        ================================================

        Este mensaje fue enviado desde el formulario de contacto de tu sitio web ZYON GALICIA.
        """

        msg.attach(MIMEText(cuerpo_correo, 'plain', 'utf-8'))

        # Enviar el correo
        logger.info(f"Intentando conectar al servidor SMTP: {SMTP_SERVER}:{SMTP_PORT}")
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Habilitar TLS
        logger.info("Iniciando sesión en el servidor SMTP...")
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        text = msg.as_string()
        logger.info(f"Enviando correo a {RECEIVER_EMAIL}...")
        server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, text)
        server.quit()
        logger.info("Correo enviado exitosamente.")

        # Devolver respuesta de éxito
        return jsonify({
            "success": True, 
            "message": "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto."
        }), 200

    except smtplib.SMTPAuthenticationError as e:
        logger.error(f"Error de autenticación SMTP: {e}")
        return jsonify({
            "success": False, 
            "message": "Error de autenticación. Configuración de correo incorrecta."
        }), 500
    except smtplib.SMTPException as e:
        logger.error(f"Error SMTP: {e}")
        return jsonify({
            "success": False, 
            "message": "Error al enviar el correo. Por favor, inténtalo más tarde."
        }), 500
    except Exception as e:
        logger.error(f"Error inesperado: {e}")
        return jsonify({
            "success": False, 
            "message": "Ocurrió un error inesperado. Por favor, inténtalo más tarde."
        }), 500

# Endpoint de health check
@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok", 
        "message": "Backend de contacto funcionando correctamente",
        "timestamp": datetime.now().isoformat()
    }), 200

# Ruta principal
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Backend de contacto de Zyon Galicia",
        "endpoints": {
            "POST /send_email": "Enviar mensaje de contacto",
            "GET /health": "Verificar estado del servicio"
        }
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    logger.info(f"Iniciando servidor en el puerto {port}")
    app.run(host='0.0.0.0', port=port, debug=True)