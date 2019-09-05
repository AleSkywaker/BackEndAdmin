// Requires
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Inicializar express
const app = express();
const port = 3000;

// default options
app.use(fileUpload());

app.put('/', (req, res, next) => {
  //Obtener nombre del archivo
  let nombreImagen = req.files.img;
  let nombreCortado = nombreImagen.name.split('.');
  let extension = nombreCortado[nombreCortado.length - 1];

  //Extensiones validas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      message: 'No ha subido imagen'
    });
  }
  res.status(200).json({
    ok: true,
    message: 'Nueva ruta upload',
    extension
  });
});

module.exports = app;
