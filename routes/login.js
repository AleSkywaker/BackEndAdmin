const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const Usuario = require('../models/usuario');

const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;
app.post('/', (req, res, next) => {
  let body = req.body;

  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar usuario',
        errors: err
      });
    }
    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Credenciales incorrectas',
        errors: err
      });
    }
    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Algo va mal',
        errors: err
      });
    }

    // Crear Token
    usuarioDB.password = ';)';
    let token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4horas
    res.status(200).json({
      ok: true,
      usuarioDB,
      id: usuarioDB._id,
      mensaje: { message: 'Login correcto' },
      token
    });
  });
});

module.exports = app;
