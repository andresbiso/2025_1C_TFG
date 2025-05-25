exports.passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Confirmación de Actualización de Contraseña</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href=""><img class="logo"
                    src="" alt="Logo"></a>
            <div class="message">Confirmación de Actualización de Contraseña</div>
            <div class="body">
                <p>Hola ${name},</p>
                <p>Tu contraseña se ha actualizado exitosamente para el correo electrónico <span class="highlight">${email}</span>.
                </p>
                <p>Si no solicitaste este cambio de contraseña, por favor contáctanos de inmediato para asegurar tu cuenta.</p>
            </div>
            <div class="support">Si tienes alguna pregunta o necesitas asistencia, no dudes en comunicarte con nosotros 
                en <a href="mailto:info@mailpit.com">info@mailpit.com</a>. ¡Estamos aquí para ayudarte!
            </div>
        </div>
    </body>
    
    </html>`;
};
