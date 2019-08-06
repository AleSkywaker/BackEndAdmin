const express = require('express');
const app = express();
const Usuario = require('../models/usuario');

app.get('/', (req, res, next) => {
  if (req.params.id === undefined) {
    res.status(200).json({
      ok: true,
      message: `Hola ${'USUARIO'}`
    });
  } else {
    res.status(200).json({
      ok: true,
      message: `Hola ${req.params.id}`
    });
  }
});

module.exports = app;
