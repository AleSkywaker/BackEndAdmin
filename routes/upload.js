// Requires
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');

// Inicializar express
const app = express();

// default options
app.use(fileUpload());

// Models

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

app.put('/:tipo/:id', (req, res, next) => {
  // Obtener nombre del archivo
  let imagen = req.files.img;
  let nombreCortado = imagen.name.split('.');
  let extension = nombreCortado[nombreCortado.length - 1];

  // Extensiones validas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
  let tipo = req.params.tipo;
  let id = req.params.id;
  // Tipos validos
  let tiposValidos = ['hospitales', 'medicos', 'usuarios'];

  if (tiposValidos.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      message: 'Tipo no valido',
      errors: {
        message: `Los tipos validos son ${tiposValidos.join(', ')}`
      }
    });
  }

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      message: 'No ha subido imagen'
    });
  }

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      message: 'Extension no valida',
      errors: {
        message: `Las extensiones validas son ${extensionesValidas.join(', ')}`
      }
    });
  }

  // Nombre del archivo personalizado
  let nombreImagenPersonalizado = `${id}-${new Date().getMilliseconds()}.${extension}`;

  // Mover el archivo
  let path = `./uploads/${tipo}/${nombreImagenPersonalizado}`;

  imagen.mv(path, err => {
    if (err) {
      return res.status(500).json({
        ok: false,
        message: 'Error al mover la imagen',
        errors: err
      });
    }
    subirPorTipo(tipo, id, path, res);

    // res.status(200).json({
    //   ok: true,
    //   message: 'Imagen guardada correctamente!!',
    //   extension,
    //   nombreImagenPersonalizado
    // });
  });
});

function subirPorTipo(tipo, id, path, res) {
  if (tipo === 'usuarios') {
  }
  if (tipo === 'medicos') {
  }
  if (tipo === 'hospitales') {
  }
}

module.exports = app;
