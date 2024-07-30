const nodemailer = require('nodemailer');

// Remplacez par votre mot de passe d'application Gmail
const appPassword = 'votre_mot_de_passe_application';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'kouao@9309@gmail.com',
    pass: "6903315569",
  },
});

async function main() {
  const mailOptions = {
    from: '"Maddison Foo Koch " <kouao@9309@gmail.com>',
    to: 'beyrastanislas@gmail.com, angelabeub78@gmail.com',
    subject: 'Email envoyé depuis Nodemailer',
    text: 'Bonjour ! Cet email a été envoyé à partir de Node.js.',
    html: '<b>Ce message est formaté en HTML.</b>',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé :', info.messageId);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
  }
}

main();
