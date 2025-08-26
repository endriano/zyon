from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging
from datetime import datetime

# Configuración más detallada de logging
logging.basicConfig(
    level=logging.DEBUG,  # Cambiar a DEBUG para más detalles
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, 
     origins=["http://localhost:3000", "http://localhost:5173", "https://*.replit.co", "https://*.repl.co"],
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"],
     supports_credentials=True)

# Configuración del correo con validación
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SENDER_EMAIL = os.getenv('SENDER_EMAIL', 'endryhdez@gmail.com')
SENDER_PASSWORD = os.getenv('SENDER_PASSWORD', 'vhiy qrrx gaot ixlw')
RECEIVER_EMAIL = os.getenv('RECEIVER_EMAIL', 'endry@fmetal.es')

# Log de configuración al iniciar
logger.info(f"Configuración SMTP: Server={SMTP_SERVER}, Port={SMTP_PORT}")
logger.info(f"Email sender: {SENDER_EMAIL}")
logger.info(f"Email receiver: {RECEIVER_EMAIL}")

@app.route('/send_email', methods=['POST'])
def send_email():
    """
    Endpoint para enviar correos desde el formulario de contacto.
    """
    try:
        logger.info("=== INICIANDO PROCESO DE ENVÍO DE EMAIL ===")

        # Log de headers
        logger.debug(f"Headers recibidos: {dict(request.headers)}")

        data = request.get_json()
        logger.info(f"Datos recibidos: {data}")

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

        logger.debug(f"Campos extraídos - Nombre: {nombre}, Email: {email}, Tel: {telefono}, Subject: {subject}")

        # Validación básica
        if not nombre or not email or not mensaje_usuario:
            logger.warning("Datos de formulario incompletos")
            return jsonify({
                "success": False, 
                "message": "Por favor, complete todos los campos obligatorios (Nombre, Email, Mensaje)."
            }), 400

        if not ("@" in email and "." in email):
            logger.warning(f"Formato de email inválido: {email}")
            return jsonify({
                "success": False, 
                "message": "Por favor, ingrese un correo electrónico válido."
            }), 400

        # Verificar configuración de correo
        if not SENDER_EMAIL or not SENDER_PASSWORD or not RECEIVER_EMAIL:
            logger.error("Configuración de correo incompleta")
            logger.error(f"SENDER_EMAIL: {'Configurado' if SENDER_EMAIL else 'NO CONFIGURADO'}")
            logger.error(f"SENDER_PASSWORD: {'Configurado' if SENDER_PASSWORD else 'NO CONFIGURADO'}")
            logger.error(f"RECEIVER_EMAIL: {'Configurado' if RECEIVER_EMAIL else 'NO CONFIGURADO'}")
            return jsonify({
                "success": False, 
                "message": "Error de configuración del servidor de correo."
            }), 500

        # Crear mensaje
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Subject'] = f"Nuevo mensaje de contacto: {subject if subject else 'Consulta General'}"

        cuerpo_correo = f"""
        Has recibido un nuevo mensaje desde el formulario de contacto.

        ================================================
        DETALLES DEL MENSAJE
        ================================================
        Fecha y hora: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}
        Nombre: {nombre}
        Email: {email}
        Teléfono: {telefono if telefono else 'No proporcionado'}
        Asunto: {subject if subject else 'No especificado'}

        MENSAJE:
        {mensaje_usuario}
        ================================================

        Este mensaje fue enviado desde el formulario de contacto de tu sitio web.
        """

        msg.attach(MIMEText(cuerpo_correo, 'plain', 'utf-8'))

        # Enviar correo con más logging
        logger.info(f"Intentando conectar a SMTP: {SMTP_SERVER}:{SMTP_PORT}")
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        logger.debug("Conexión SMTP establecida")

        logger.info("Iniciando TLS...")
        server.starttls()
        logger.debug("TLS iniciado")

        logger.info("Intentando login...")
        logger.debug(f"Email sender para login: {SENDER_EMAIL}")
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        logger.debug("Login exitoso")

        logger.info(f"Enviando correo de {SENDER_EMAIL} a {RECEIVER_EMAIL}")
        server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, msg.as_string())
        logger.debug("Correo enviado a nivel de protocolo")

        server.quit()
        logger.info("=== CORREO ENVIADO EXITOSAMENTE ===")

        return jsonify({
            "success": True, 
            "message": "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto."
        }), 200

    except smtplib.SMTPAuthenticationError as e:
        logger.error(f"=== ERROR DE AUTENTICACIÓN SMTP ===")
        logger.error(f"Código: {e.smtp_code}")
        logger.error(f"Respuesta: {e.smtp_error}")
        logger.error(f"Email usado: {SENDER_EMAIL}")
        return jsonify({
            "success": False, 
            "message": "Error de autenticación. Verifica las credenciales de correo."
        }), 500
    except smtplib.SMTPRecipientsRefused as e:
        logger.error(f"=== ERROR DE DESTINATARIO ===")
        logger.error(f"Destinatarios rechazados: {e.recipients}")
        return jsonify({
            "success": False, 
            "message": "Error con la dirección de correo del destinatario."
        }), 500
    except smtplib.SMTPServerDisconnected as e:
        logger.error(f"=== ERROR DE CONEXIÓN SMTP ===")
        logger.error(f"Servidor desconectado: {e}")
        return jsonify({
            "success": False, 
            "message": "Error de conexión con el servidor SMTP."
        }), 500
    except smtplib.SMTPException as e:
        logger.error(f"=== ERROR SMTP GENERAL ===")
        logger.error(f"Error SMTP: {e}")
        logger.error(f"Tipo de error: {type(e)}")
        return jsonify({
            "success": False, 
            "message": f"Error al enviar el correo: {str(e)}"
        }), 500
    except Exception as e:
        logger.error(f"=== ERROR INESPERADO ===")
        logger.error(f"Error: {e}")
        logger.error(f"Tipo: {type(e)}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({
            "success": False, 
            "message": f"Ocurrió un error inesperado: {str(e)}"
        }), 500

# Endpoint de prueba para verificar configuración
@app.route('/test_email_config', methods=['GET'])
def test_email_config():
    return jsonify({
        "smtp_server": SMTP_SERVER,
        "smtp_port": SMTP_PORT,
        "sender_email_configured": bool(SENDER_EMAIL),
        "receiver_email_configured": bool(RECEIVER_EMAIL),
        "sender_email": SENDER_EMAIL if os.getenv('DEBUG_MODE') == 'true' else "***@***.com"
    }), 200

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok", 
        "message": "Backend de contacto funcionando correctamente",
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "message": "Backend de contacto de Zyon Galicia",
        "endpoints": {
            "POST /send_email": "Enviar mensaje de contacto",
            "GET /health": "Verificar estado del servicio",
            "GET /test_email_config": "Verificar configuración de email"
        }
    }), 200

# Añade este endpoint después de los otros endpoints existentes
@app.route('/debug_config', methods=['GET'])
def debug_config():
    """Endpoint para debugging de configuración"""
    return jsonify({
        "smtp_server": SMTP_SERVER,
        "smtp_port": SMTP_PORT,
        "sender_email": SENDER_EMAIL,
        "receiver_email": RECEIVER_EMAIL,
        "sender_email_length": len(SENDER_EMAIL) if SENDER_EMAIL else 0,
        "password_length": len(SENDER_PASSWORD) if SENDER_PASSWORD else 0,
        "password_configured": bool(SENDER_PASSWORD),
        "all_configured": all([SENDER_EMAIL, SENDER_PASSWORD, RECEIVER_EMAIL])
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    logger.info(f"Iniciando servidor backend en el puerto {port}")
    app.run(host='0.0.0.0', port=port, debug=False)