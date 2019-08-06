const express = require('express');

let app = express();

app.get('/', (req, res, next) => {
  if (req.params.id === undefined) {
    res.status(200).json({
      ok: true,
      message: `Hola ${'USUARIO'}`
    });
  } else {
    res.status(200).json({
      ok: true,
      message: `Hola ${req.params.id}`
    });
  }
});

module.exports = app;
