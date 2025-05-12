const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  const transporterOptions = {
    host: process.env.SMTP_HOST || "localhost", // Local Mailpit host
    port: process.env.SMTP_PORT || 1025, // Default Mailpit SMTP port
    secure: false, // Mailpit does not use TLS by default
  };

  // Append authentication only if a user is set
  // Mailpit typically allows anonymous login
  // No authentication needed unless configured
  if (process.env.SMTP_USER) {
    transporterOptions.auth = {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    };
  }

  // Create transporter outside the function

  try {
    const transporter = nodemailer.createTransport(transporterOptions);

    const info = await transporter.sendMail({
      from: '"Local Mailpit Instance" <no-reply@mailpit.local>',
      to: email,
      subject: `[LOCAL MAILPIT] ${title}`, // Prefix added to indicate Mailpit usage
      html: `<p><strong>This email was sent from a local Mailpit instance.</strong></p><hr>${body}`,
    });

    console.log("Mail sent via local Mailpit instance: ", info);
    return info;
  } catch (error) {
    console.error("Error while sending mail through Mailpit:", error);
  }
};

module.exports = mailSender;
