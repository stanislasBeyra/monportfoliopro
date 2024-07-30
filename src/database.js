// src/database.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const transporter = require('./email'); // Importer le module Nodemailer

// Chemin vers le fichier de base de données
const dbPath = path.join(__dirname, 'portfolio.db');

// Créer une nouvelle base de données ou ouvrir une base de données existante
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données:', err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');
    }
});

// Créer les tables (si elles n'existent pas déjà)
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

// Fonction pour ajouter un message
function addMessage(name, email, message, callback) {
    const sql = `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`;
    db.run(sql, [name, email, message], function(err) {
        if (err) {
            console.error('Erreur lors de l\'ajout du message à la base de données:', err.message);
            return callback(err);
        }
        
        // Envoyer un email avec les détails du message
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Nouveau message depuis le formulaire de contact',
            text: `Vous avez reçu un nouveau message de ${name} (${email}) :\n\n${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'email:', error.message);
                return callback(error);
            }
            console.log('Email envoyé : ' + info.response);
            callback(null, this.lastID);
        });
    });
}

// Fonction pour récupérer tous les messages
function getMessages(callback) {
    const sql = `SELECT * FROM messages ORDER BY created_at DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Erreur lors de la récupération des messages:', err.message);
            return callback(err);
        }
        callback(null, rows);
    });
}

module.exports = { db, addMessage, getMessages };
