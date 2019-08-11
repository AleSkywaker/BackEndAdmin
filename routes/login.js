const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const Usuario = require('../models/usuario');

app.post('/', (req, res, next) => {
  let body = req.body;
  res.status(200).json({
    ok: true,
    body,
    mensaje: { message: 'Login correcto' }
  });
});

module.exports = app;
