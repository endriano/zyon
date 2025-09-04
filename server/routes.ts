// server/routes.ts
import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { spawn } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // --- OTROS ENDPOINTS EXISTENTES ---

  // --- NUEVO/ACTUALIZADO ENDPOINT PARA CONTACTO ---
  app.post('/api/contact', async (req: Request, res: Response) => {
    console.log("[BACKEND] Recibida solicitud POST a /api/contact");
    try {
      const formData = req.body;
      console.log("[BACKEND] Datos del formulario recibidos:", formData);

      // Validación básica en el backend
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
         console.error("[BACKEND] Error: Datos de formulario incompletos");
         return res.status(400).json({ success: false, message: "Por favor, complete todos los campos obligatorios." });
      }

      // Ruta al script PHP simple
      const phpScriptPath = path.join(__dirname, '..', 'scripts', 'send_email_simple.php');

      // Convertir los datos del formulario a una cadena JSON para pasarla como argumento
      const jsonDataString = JSON.stringify(formData);

      console.log(`[BACKEND] Ejecutando PHP: php ${phpScriptPath} [DATOS_OCULTOS_POR_SEGURIDAD]`);

      // Ejecutar el script PHP pasando los datos como argumento
      const phpProcess = spawn('php', [phpScriptPath, jsonDataString]);

      let scriptOutput = '';
      let scriptErrorOutput = '';

      phpProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
        console.log(`[PHP STDOUT] ${data.toString()}`);
      });

      phpProcess.stderr.on('data', (data) => {
        scriptErrorOutput += data.toString();
        console.error(`[PHP STDERR] ${data.toString()}`);
      });

      phpProcess.on('close', (code) => {
        console.log(`[BACKEND] Proceso PHP finalizado con código ${code}`);
        if (scriptErrorOutput) {
            console.error(`[BACKEND] Errores del script PHP: ${scriptErrorOutput}`);
        }
        console.log(`[BACKEND] Salida del script PHP: ${scriptOutput}`);

        if (code === 0) {
          // El script PHP finalizó correctamente, intenta parsear su salida JSON
          try {
            const result = JSON.parse(scriptOutput.trim());
            if (result.success) {
               console.log("[BACKEND] Correo enviado con éxito según PHP.");
               res.status(200).json({ success: true, message: result.message });
            } else {
               console.error("[BACKEND] PHP reportó fallo al enviar correo:", result.message);
               res.status(500).json({ success: false, message: result.message });
            }
          } catch (parseError: any) {
            console.error("[BACKEND] Error al parsear la salida JSON del script PHP:", parseError.message, "Salida recibida:", scriptOutput);
            res.status(500).json({ success: false, message: "Error al procesar la respuesta del servidor de correo." });
          }
        } else {
          // El proceso PHP falló (código de salida != 0)
          console.error(`[BACKEND] Fallo en el proceso PHP (código ${code}).`);
          res.status(500).json({ success: false, message: "Error interno del servidor al procesar el formulario." });
        }
      });

      phpProcess.on('error', (error) => {
         console.error("[BACKEND] Error al iniciar el proceso PHP:", error);
         res.status(500).json({ success: false, message: "Error interno del servidor." });
      });

    } catch (error: any) {
      console.error("[BACKEND] Error inesperado en el endpoint de contacto:", error);
      res.status(500).json({ success: false, message: "Ocurrió un error inesperado." });
    }
  });
  // --- FIN DEL ENDPOINT DE CONTACTO ---

  const httpServer = createServer(app);
  return httpServer;
}