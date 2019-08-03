// Requires
let express = require('express');

// Inicializar express
let app = express();
let port = 3000;

// Escuchar peticiones
app.listen(port, () => {
  console.log(`Escuchando en puerto ${port} \x1b[36m%s\x1b[0m`, `online`);
});
