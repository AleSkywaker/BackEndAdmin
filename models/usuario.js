const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol permitido'
};

let usuarioSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es necesario'] },
  email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
  password: { type: String, required: [true, 'La contraseña es necesaria'] },
  img: { type: String, required: false, default: null },
  role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} debe ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);
