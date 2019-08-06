const express = require('express');
const app = express();
const Usuario = require('../models/usuario');

app.get('/', (req, res, next) => {
  Usuario.find({}, (err, usuarios) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: `Error en base de datos`,
        errors: err
      });
    } else {
      res.status(200).json({
        ok: true,
        usuarios
      });
    }
  });
});

module.exports = app;
