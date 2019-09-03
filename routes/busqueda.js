const express = require('express');
const app = express();

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

/*************************
 * Buscar por colección  *
 *************************/

app.get('/cole/:tabla/:busqueda', (req, res) => {
  let busqueda = req.params.busqueda;
  let tabla = req.params.tabla;
  let regex = new RegExp(busqueda, 'i');

  switch (tabla) {
    case 'usuario':
      promesa = buscarUsusarios(busqueda, regex);
      break;
    case 'medico':
      promesa = buscarMedicos(busqueda, regex);
      break;
    case 'hospital':
      promesa = buscarHospitales(busqueda, regex);
      break;

    default:
      return res.status(404).json({
        ok: false,
        message: 'Url no encontrada',
        error: { message: 'Tipo de tabla no encontrada' }
      });
  }

  promesa.then(data => {
    res.status(200).json({
      ok: true,
      [tabla]: data
    });
  });
});

/***************
 * Buscar todo *
 ***************/

app.get('/todo/:busqueda', (req, res, next) => {
  let busqueda = req.params.busqueda;
  let regex = new RegExp(busqueda, 'i');

  Promise.all([
    buscarHospitales(busqueda, regex),
    buscarMedicos(busqueda, regex),
    buscarUsuarios(busqueda, regex)
  ]).then(respuestas => {
    res.status(200).json({
      ok: true,
      hospitales: respuestas[0],
      medicos: respuestas[1],
      usuarios: respuestas[2]
    });
  });
});

function buscarHospitales(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Hospital.find({ nombre: regex })
      .populate('usuario', 'nombre email')
      .exec((err, hospitales) => {
        if (err) {
          reject('Error al cargar hospitales', err);
        } else {
          resolve(hospitales);
        }
      });
  });
}
function buscarMedicos(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Medico.find({ nombre: regex })
      .populate('usuario', 'nombre email')
      .populate('hospital')
      .exec((err, medicos) => {
        if (err) {
          reject('Error al cargar medicos', err);
        } else {
          resolve(medicos);
        }
      });
  });
}
function buscarUsuarios(busqueda, regex) {
  return new Promise((resolve, reject) => {
    Usuario.find({}, 'nombre email role img')
      .or([{ nombre: regex }, { email: regex }])
      .exec((err, usuarios) => {
        if (err) {
          reject('Error al cargar usuarios', err);
        } else {
          resolve(usuarios);
        }
      });
  });
}

module.exports = app;
