// controllers/SendWhatsappMessageController.js

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');

// Crée une instance du client WhatsApp
const client = new Client({
    authStrategy: new LocalAuth()
});

// Événement déclenché lorsqu'un QR code est généré
client.on('qr', qr => {
    // Générer le QR code en texte ASCII et l'afficher dans la console
    qrcodeTerminal.generate(qr, { small: true }, qrCode => {
        console.log('QR Code:\n', qrCode); // Afficher le QR code dans la console
    });
});

// Événement déclenché lorsque le client est prêt
client.on('ready', () => {
    console.log('Client is ready!');
});

// Initialiser le client WhatsApp
client.initialize();

// Route pour envoyer un message WhatsApp
exports.sendMessage = (req, res) => {
    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).send({ error: 'Number and message are required' });
    }

    client.sendMessage(`${number}@c.us`, message)
        .then(response => {
            res.redirect('/');

            console.log('Message sent successfully:', response);
        })
        .catch(error => {
            res.status(500).send({ error: 'Error sending message', details: error });
        });
};

// Route pour obtenir le QR code
exports.getQRCode = (req, res) => {
    const qr = req.body.qr || req.query.qr; // Adjust based on where qr is located in the request
    qrcodeTerminal.generate(qr, { small: true }, qrCode => {
        // ... rest of your code
    });
};

