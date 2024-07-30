// src/email.js

require('dotenv').config();
const nodemailer = require('nodemailer');

// Configurer le transporteur SMTP pour Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Utilise la variable d'environnement
        pass: process.env.EMAIL_PASS  // Utilise la variable d'environnement
    }
});

module.exports = transporter;
