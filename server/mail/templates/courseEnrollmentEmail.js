exports.courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Confirmación de Registro en el Curso</title>
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
            <a href="http://localhost:8083/"><img src="http://localhost:8083/logo.svg" width="120" height="60" alt="Logo" /></a>
            <div class="message">Confirmación de Registro en el Curso</div>
            <div class="body">
                <p>Estimado/a ${name},</p>
                <p>Te has registrado exitosamente en el curso <span class="highlight">"${courseName}"</span>. ¡Estamos emocionados de tenerte como participante!</p>
                <p>Por favor, inicia sesión en tu panel de aprendizaje para acceder al material del curso y comenzar tu viaje de aprendizaje.</p>
                <a class="cta" href="http://localhost:8083/dashboard/enrolled-courses">Ir al Panel de Control</a>
            </div>
            <div class="support">Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos en 
            <a href="mailto:info@mailpit.com">mailto:info@mailpit.com</a>. ¡Estamos aquí para ayudarte!</div>
        </div>
    </body>
    
    </html>`;
};
