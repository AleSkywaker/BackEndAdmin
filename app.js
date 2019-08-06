// Requires
let express = require('express');
const mongoose = require('mongoose');
let port = 3000;

// Inicializar express
let app = express();
mongoose.connect('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Conectatos a la base de datos');
});

// Rutas


// Escuchar peticiones
app.listen(port, () => {
  console.log(`Escuchando en puerto ${port} \x1b[36m%s\x1b[0m`, `online`);
});
