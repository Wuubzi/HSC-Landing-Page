import type { APIRoute } from "astro";
import { createTransport } from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";

// Configuración del transportador de email
const transporter = createTransport({
  host: import.meta.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(import.meta.env.SMTP_PORT || "587"),
  secure: false, // true para 465, false para otros puertos
  auth: {
    user: "carlosasalas321@gmail.com",
    pass: "nkyh qdpq cnor qcnh",
  },
});

// Función para procesar archivos adjuntos
async function processAttachments(
  files: FileList | File[]
): Promise<Attachment[]> {
  const attachments: Attachment[] = [];

  try {
    for (const file of files) {
      if (file instanceof File) {
        // Validar tamaño del archivo (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(
            `El archivo ${file.name} es demasiado grande (máximo 10MB)`
          );
        }

        // Validar tipos de archivo permitidos
        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ];

        if (!allowedTypes.includes(file.type)) {
          throw new Error(`Tipo de archivo no permitido: ${file.type}`);
        }

        const buffer = await file.arrayBuffer();
        attachments.push({
          filename: file.name,
          content: Buffer.from(buffer),
          contentType: file.type,
        });
      }
    }
  } catch (error) {
    console.error("Error procesando archivos adjuntos:", error);
    throw error;
  }

  return attachments;
}

// Función para validar y sanitizar entrada
function validateAndSanitize(data: any) {
  const errors: string[] = [];

  if (
    !data.nombreCompleto ||
    typeof data.nombreCompleto !== "string" ||
    data.nombreCompleto.trim().length < 2
  ) {
    errors.push(
      "El nombre completo es requerido y debe tener al menos 2 caracteres"
    );
  }

  if (!data.correoElectronico || typeof data.correoElectronico !== "string") {
    errors.push("El correo electrónico es requerido");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correoElectronico)) {
      errors.push("El correo electrónico no tiene un formato válido");
    }
  }

  if (
    data.telefono &&
    typeof data.telefono === "string" &&
    data.telefono.trim().length > 0
  ) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.telefono)) {
      errors.push("El teléfono contiene caracteres no válidos");
    }
  }

  return {
    errors,
    data: {
      nombreCompleto: data.nombreCompleto?.toString().trim(),
      correoElectronico: data.correoElectronico
        ?.toString()
        .trim()
        .toLowerCase(),
      telefono: data.telefono?.toString().trim(),
      posicionInteres: data.posicionInteres?.toString().trim(),
      mensaje: data.mensaje?.toString().trim(),
    },
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Verificar Content-Type
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Content-Type debe ser multipart/form-data",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Obtener datos del formulario
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Error al procesar los datos del formulario",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Extraer y validar datos
    const rawData = {
      nombreCompleto: formData.get("nombreCompleto"),
      correoElectronico: formData.get("correoElectronico"),
      telefono: formData.get("telefono"),
      posicionInteres: formData.get("posicionInteres"),
      mensaje: formData.get("mensaje"),
    };

    const cvFile = formData.get("cv") as File;

    // Validar que el CV esté presente
    if (!cvFile || !(cvFile instanceof File) || cvFile.size === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "El archivo CV es requerido y debe ser un archivo válido",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Validar y sanitizar datos
    const validation = validateAndSanitize(rawData);
    if (validation.errors.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Errores de validación",
          details: validation.errors,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const {
      nombreCompleto,
      correoElectronico,
      telefono,
      posicionInteres,
      mensaje,
    } = validation.data;

    // Procesar archivo adjunto
    let attachments: Attachment[];
    try {
      attachments = await processAttachments([cvFile]);
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Error procesando el archivo adjunto",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Verificar configuración de email
    if (!import.meta.env.SMTP_USER || !import.meta.env.SMTP_PASS) {
      console.error("Variables de entorno SMTP no configuradas");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Error de configuración del servidor",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Configurar email principal
    const mailOptions = {
      from: `"${nombreCompleto}" <${import.meta.env.SMTP_USER}>`,
      to: import.meta.env.RECIPIENT_EMAIL || "carlosasalas321@gmail.com",
      subject: `Nueva Aplicación - ${
        posicionInteres || "Posición no especificada"
      }`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Nueva Aplicación Recibida</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Información del Candidato</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Nombre Completo:</td>
                <td style="padding: 8px 0; color: #374151;">${nombreCompleto}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Correo Electrónico:</td>
                <td style="padding: 8px 0; color: #374151;">${correoElectronico}</td>
              </tr>
              ${
                telefono
                  ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Teléfono:</td>
                <td style="padding: 8px 0; color: #374151;">${telefono}</td>
              </tr>
              `
                  : ""
              }
              ${
                posicionInteres
                  ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #6b7280;">Posición de Interés:</td>
                <td style="padding: 8px 0; color: #374151;">${posicionInteres}</td>
              </tr>
              `
                  : ""
              }
            </table>
          </div>
          
          ${
            mensaje
              ? `
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Mensaje del Candidato</h3>
            <p style="color: #374151; line-height: 1.6; margin: 0;">${mensaje.replace(
              /\n/g,
              "<br>"
            )}</p>
          </div>
          `
              : ""
          }
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              📎 CV adjunto: ${cvFile.name}
              <br>
              📅 Fecha de aplicación: ${new Date().toLocaleDateString("es-ES")}
            </p>
          </div>
        </div>
      `,
      attachments: attachments,
    };

    // Enviar email principal
    let info;
    try {
      info = await transporter.sendMail(mailOptions);
      console.log("Email enviado:", info.messageId);
    } catch (error) {
      console.error("Error enviando email principal:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Error al enviar el email. Por favor, inténtalo de nuevo.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Enviar email de confirmación al candidato
    try {
      const confirmationMailOptions = {
        from: import.meta.env.SMTP_USER,
        to: correoElectronico,
        subject: "Confirmación de Aplicación Recibida",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1;">¡Gracias por tu aplicación!</h2>
            
            <p style="color: #374151; line-height: 1.6;">
              Hola <strong>${nombreCompleto}</strong>,
            </p>
            
            <p style="color: #374151; line-height: 1.6;">
              Hemos recibido tu aplicación para ${
                posicionInteres
                  ? `la posición de <strong>${posicionInteres}</strong>`
                  : "unirte a nuestro equipo"
              }. 
              Tu CV ha sido recibido correctamente y nuestro equipo de recursos humanos lo revisará en los próximos días.
            </p>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">Resumen de tu aplicación:</h3>
              <ul style="color: #374151; line-height: 1.6;">
                <li>📧 Correo: ${correoElectronico}</li>
                ${telefono ? `<li>📱 Teléfono: ${telefono}</li>` : ""}
                ${
                  posicionInteres
                    ? `<li>💼 Posición: ${posicionInteres}</li>`
                    : ""
                }
                <li>📎 CV: ${cvFile.name}</li>
                <li>📅 Fecha: ${new Date().toLocaleDateString("es-ES")}</li>
              </ul>
            </div>
            
            <p style="color: #374151; line-height: 1.6;">
              Te contactaremos pronto si tu perfil coincide con lo que estamos buscando.
            </p>
            
            <p style="color: #374151; line-height: 1.6;">
              ¡Gracias por tu interés en unirte a nuestro equipo!
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Saludos cordiales,<br>
                Equipo de Recursos Humanos
              </p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(confirmationMailOptions);
    } catch (error) {
      console.error("Error enviando email de confirmación:", error);
      // No fallar si el email de confirmación falla
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Aplicación enviada exitosamente",
        messageId: info.messageId,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error general:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Error interno del servidor",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};

// Endpoint OPTIONS para CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

// Endpoint GET para verificar que la API funciona
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      message: "API de envío de emails funcionando correctamente",
      timestamp: new Date().toISOString(),
      status: "healthy",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};
