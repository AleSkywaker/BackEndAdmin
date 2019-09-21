const express = require('express');
const app = express();

const path = require('path');

app.get('/:tipo/:img', (req, res, next) => {
  let tipo = req.params.tipo;
  let img = req.params.img;

  let pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${img}`);

  res.status(200).json({
    ok: true,
    message: 'aqui esta tu imagen'
  });
});

module.exports = app;
