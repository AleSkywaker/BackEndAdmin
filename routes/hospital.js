const express = require('express');
const app = express();

const mdAuth = require('../middlewares/authentication');

const Hospital = require('../models/hospital');

app.get('/', (req, res, next) => {
  Hospital.find({})
    .populate('usuario', 'nombre email')
    .exec((err, hospitales) => {
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

app.post('/', mdAuth.verificaToken, (req, res, next) => {
  let body = req.body;

  var hospital = new Hospital({
    nombre: body.nombre,
    usuario: req.usuario._id
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

app.put('/:id', mdAuth.verificaToken, (req, res, next) => {
  let id = req.params.id;
  let body = req.body;

  Hospital.findById(id, (err, hospital) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar hospital',
        errors: err
      });
    }
    if (!hospital) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Hospital no encontrado con id ' + id,
        errors: { message: 'No existe un hospital con este ID' }
      });
    }
    hospital.nombre = body.nombre;
    hospital.usuario = req.usuario._id;

    hospital.save((err, hospitalGuardado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al actualizar hospital',
          errors: err
        });
      }
      res.status(200).json({
        ok: true,
        hospitalGuardado
      });
    });
  });
});

app.delete('/:id', mdAuth.verificaToken, (req, res, next) => {
  let id = req.params.id;

  Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al borrar hospital',
        errors: err
      });
    }
    if (!hospitalBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: 'No se ha encontrado hospital con este ID',
        errors: { message: 'No existe hospital con este ID' }
      });
    }
    res.status(200).json({
      ok: true,
      hospitalBorrado,
      mensaje: { message: 'Hospital borrado correctamente' }
    });
  });
});

module.exports = app;
