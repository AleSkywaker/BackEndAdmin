const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'aqui esta tu imagen'
  });
});

module.exports = app;
