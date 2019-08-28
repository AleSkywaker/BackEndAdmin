const express = require('express');
const app = express();
const Medico = require('../models/medico');

const mdAuth = require('../middlewares/authentication');

app.get('/', (req, res, next) => {
  let desde = req.query.desde || 0;
  Medico.find({})
    .skip(desde)
    .limit(3)
    .populate('usuario', 'nombre email')
    .populate('hospital')
    .exec((err, medicos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: `Error en base de datos al buscar medicos`,
          errors: err
        });
      } else {
        Medico.count({}, (err, cantidad) => {
          res.status(200).json({
            ok: true,
            medicos,
            cantidad
          });
        });
      }
    });
});

app.post('/', mdAuth.verificaToken, (req, res, next) => {
  let body = req.body;

  var medico = new Medico({
    nombre: body.nombre,
    usuario: req.usuario._id,
    hospital: body.hospital
  });

  medico.save((err, medicoGuardado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al guardar medico',
        errors: err
      });
    } else {
      res.status(201).json({
        ok: true,
        medicoGuardado
      });
    }
  });
});

app.put('/:id', mdAuth.verificaToken, (req, res, next) => {
  let id = req.params.id;
  let body = req.body;

  Medico.findById(id, (err, medico) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar medico',
        errors: err
      });
    }
    if (!medico) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Medico encontrado',
        errors: { message: 'No existe un medico con este ID' }
      });
    }
    medico.nombre = body.nombre;
    medico.usuario = req.usuario._id;
    medico.hospital = body.hospital;

    medico.save((err, medicoGuradado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al actualizar medico',
          errors: err
        });
      }
      res.status(200).json({
        ok: true,
        medicoGuradado
      });
    });
  });
});

app.delete('/:id', mdAuth.verificaToken, (req, res, next) => {
  let id = req.params.id;

  Medico.findByIdAndRemove(id, (err, medicoBorrado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al borrar medico',
        errors: err
      });
    }
    if (!medicoBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: 'No se ha encontrado medico con este ID',
        errors: { message: 'No existe medico con este ID' }
      });
    }
    res.status(200).json({
      ok: true,
      medicoBorrado,
      mensaje: { message: 'Medico borrado correctamente' }
    });
  });
});

module.exports = app;
