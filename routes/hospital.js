const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const Hospital = require('../models/hospital');

const mdAuth = require('../middlewares/authentication');

app.get('/', (req, res, next) => {
  Hospital.find({}, 'nombre img usuario').exec((err, hospitales) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: `Error en base de datos al buscar hospitales`,
        errors: err
      });
    } else {
      res.status(200).json({
        ok: true,
        hospitales
      });
    }
  });
});

app.post('/', (req, res, next) => {
  let body = req.body;

  var hospital = new Hospital({
    nombre: body.nombre,
    img: body.img,
    usuario: '123'
  });

  hospital.save((err, hospitalGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error cargando hospital',
        errors: err
      });
    } else {
      res.status(201).json({
        ok: true,
        hospitalGuardado
      });
    }
  });
});
/**

app.put('/:id', mdAuth.verificaToken, (req, res, next) => {
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

app.delete('/:id', mdAuth.verificaToken, (req, res, next) => {
  let id = req.params.id;

  Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al borrar usuario',
        errors: err
      });
    }
    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: 'No se ha encontrado usuario con este ID',
        errors: { message: 'No existe usuario con este ID' }
      });
    }
    res.status(200).json({
      ok: true,
      usuarioBorrado,
      mensaje: { message: 'Usuario borrado correctamente' }
    });
  });
});
**/

module.exports = app;
