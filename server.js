const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const SendWhatsappMessageController = require('./src/controllers/SendWhatsappMessageController'); // Assurez-vous que le chemin est correct

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Ajoute ce middleware pour traiter les requêtes JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/public')));


// Configurer le moteur de vue EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Route pour afficher la page d'accueil
app.get('/', (req, res) => {
    res.render('index'); // Utilise EJS pour rendre la vue
});

// Route pour obtenir le QR code
app.get('/get-qrcode', SendWhatsappMessageController.getQRCode);


// Route pour envoyer un message WhatsApp
app.post('/send-whatsapp-message', SendWhatsappMessageController.sendMessage);

const host = 'localhost'; // Remplace par l'adresse IP souhaitée
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
