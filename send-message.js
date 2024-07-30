const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Création d'une instance du client
const client = new Client({
    authStrategy: new LocalAuth() // Utilise LocalAuth pour stocker les informations d'authentification
});

// Génération du QR code lorsque le client est prêt
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Connexion réussie
client.on('ready', () => {
    console.log('Client is ready!');
    
    // Remplace ces valeurs par le numéro de téléphone et le message que tu souhaites envoyer
    const number = '2250705137055'; // Numéro de téléphone au format international
    const message = 'Hello, this is a test message!';

    // Envoi du message
    client.sendMessage(`${number}@c.us`, message)
        .then(response => {
            console.log('Message sent successfully:', response);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
});

// Démarrage du client
client.initialize();
