require('dotenv').config();
const clientUrl = process.env.CLIENT_URL;
const otpTemplate = (otp, name) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Correo de Verificación OTP</title>
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
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
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
            <a href="${clientUrl}/"><img src="${clientUrl}/logo.svg" width="120" height="60" alt="Logo" /></a>
            <div class="message">Correo de Verificación OTP</div>
            <div class="body">
                <p>Estimado/a ${name},</p>
                <p>Gracias por registrarte. Para completar tu registro, utiliza el siguiente OTP
                    (Contraseña de un solo uso) para verificar tu cuenta:</p>
                <h2 class="highlight">${otp}</h2>
                <p>Este OTP es válido por 3 minutos. Si no solicitaste esta verificación, simplemente ignora este correo.
                Una vez que tu cuenta esté verificada, tendrás acceso a nuestra plataforma y sus funciones.</p>
            </div>
            <div class="support">Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos en <a
                    href="mailto:info@mailpit.com">info@mailpit.com</a>. ¡Estamos aquí para ayudarte!</div>
        </div>
    </body>
    
    </html>`;
};
module.exports = otpTemplate;
