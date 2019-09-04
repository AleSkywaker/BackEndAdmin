// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Inicializar express
const app = express();
const port = 3000;

app.get('/', (req, res, next) => {
  res.status(200).json({
    ok: true,
    message: 'Nueva ruta upload'
  });
});
