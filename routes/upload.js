// Requires
const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Inicializar express
const app = express();
const port = 3000;

// default options
app.use(fileUpload());

app.put('/:tipo/:id', (req, res, next) => {
  let tipo = req.params.tipo;
  let id = req.params.id;
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      message: 'No ha subido imagen'
    });
  }

  //Obtener nombre del archivo
  let nombreImagen = req.files.img;
  let nombreCortado = nombreImagen.name.split('.');
  let extension = nombreCortado[nombreCortado.length - 1];

  //Extensiones validas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      message: 'Extension no valida',
      errors: { message: `Las extensiones validas son ${extensionesValidas.join(',')}` }
    });
  }

  // Nombre del archivo personalizado

  let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

  res.status(200).json({
    ok: true,
    message: 'Imagen subida correctamente!!',
    extension,
    nombreArchivo
  });
});

module.exports = app;
