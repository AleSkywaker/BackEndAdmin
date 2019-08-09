const express = require('express');
const app = express();
const Usuario = require('../models/usuario');

app.get('/', (req, res, next) => {
  Usuario.find({}, 'nombre email img role').exec((err, usuarios) => {
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

app.post('/', (req, res, next) => {
  let body = req.body;

  var usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: body.password,
    img: body.img,
    role: body.role
  });

  usuario.save((err, usuarioGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error cargando usuario',
        errors: err
      });
    } else {
      res.status(201).json({
        ok: true,
        usuarioGuardado
      });
    }
  });
});

module.exports = app;
