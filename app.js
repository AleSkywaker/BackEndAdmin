// Requires
let express = require('express');
let port = 3000;

// Inicializar express
let app = express();

// Rutas
app.get('/:id', (req, res, next) => {
  res.status(200).json({
    ok: true,
    message: `Hola ${req.params.id}`
  });
});

// Escuchar peticiones
app.listen(port, () => {
  console.log(`Escuchando en puerto ${port} \x1b[36m%s\x1b[0m`, `online`);
});
