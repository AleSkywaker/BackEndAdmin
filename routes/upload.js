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
  let imagen = req.files.imagen;

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      message: 'No ha subido imagen'
    });
  }
  res.status(200).json({
    ok: true,
    message: 'Nueva ruta upload'
  });
});

module.exports = app;
