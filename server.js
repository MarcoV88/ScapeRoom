const express = require('express');
const nodemailer = require('nodemailer');
const data = require ('./utils/mensaje')
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// 📧 Configurar el transporter de Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

//  Verificar conexión con Gmail
transporter.verify((error, success) => {
  if (error) {
    console.log(' Error de conexión:', error.message);
  } else {
    console.log(' Conectado a Gmail correctamente');
  }
});

// 📨 ENDPOINT: Enviar correo
app.post('/enviar-correo', async (req, res) => {
  try {
    // Datos que envías desde Postman
    const { para, asunto } = req.body;

    // Validaciones
    if (!para) {
      return res.status(400).json({ error: 'Falta el destinatario (para)' });
    }
    if (!asunto) {
      return res.status(400).json({ error: 'Falta el asunto' });
    }

    let texto = "¡Enhorabuena, ha conseguido pasarse el ScapeRoom!";
    let repoLink = "https://github.com/MarcoV88/ScapeRoom";
    let c1 = "mvillamediana8@gmail.com"
    let c2 = "luislopeznunosanchez@gmail.com"
    let c3 = "random.randint.nft@gmail.com"
    let html = data(texto, repoLink, c1, c2, c3);


    // Configurar el correo
    const mailOptions = {
      from: `"Mi App" <${process.env.EMAIL_USER}>`,
      to: para,
      subject: asunto,
      html: html || ''
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    
    console.log('📧 Correo enviado a:', para);
    res.status(200).json({
      success: true,
      mensaje: 'Correo enviado correctamente',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// 🏠 Ruta de bienvenida (para probar que el servidor funciona)
app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor funcionando correctamente',
    endpoint: 'POST /enviar-correo',
    ejemplo: {
      metodo: 'POST',
      url: 'http://localhost:3000/enviar-correo',
      headers: { 'Content-Type': 'application/json' },
      body: {
        para: 'destinatario@hotmail.com',
        asunto: 'Hola desde mi API',
        texto: 'Este es un correo de prueba',
      }
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`📧 Endpoint para enviar correos: POST http://localhost:${PORT}/enviar-correo\n`);
});
