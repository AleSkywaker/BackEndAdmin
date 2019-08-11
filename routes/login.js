const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const Usuario = require('../models/usuario');

app.post('/', (req, res, next) => {
  let body = req.body;

  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(403).json({
        ok: false,
        mensaje: 'No se encontró usuario',
        errors: err
      });
    }
    res.status(200).json({
      ok: true,
      usuarioDB,
      mensaje: { message: 'Login correcto' }
    });
  });
});

module.exports = app;
