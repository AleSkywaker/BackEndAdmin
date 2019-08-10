const express = require('express');
const bcrypt = require('bcryptjs');
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
app.put('/:id', (req, res, next) => {
  let id = req.params.id;
  let body = req.body;

  Usuario.findById(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar usuario',
        errors: err
      });
    }
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Usuario no encontrado',
        errors: { message: 'No existe un usuario con este ID' }
      });
    }
    usuario.nombre = body.nombre;
    usuario.email = body.email;
    usuario.role = body.role;

    usuario.save((err, usuarioGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al actualizar usuario',
          errors: err
        });
      }
      usuarioGuardado.password = ':)';
      res.status(200).json({
        ok: true,
        usuarioGuardado
      });
    });
  });
});

app.post('/', (req, res, next) => {
  let body = req.body;

  var usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
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
