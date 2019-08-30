const express = require('express');
const app = express();

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Ususario = require('../models/usuario');

app.get('/todo/:busqueda', (req, res, next) => {
	let busqueda = req.params.busqueda;
	let regex = new RegExp(busqueda, 'i');

	Promise.all([buscarHospitales(busqueda, regex), buscarMedicos(busqueda, regex)]).then(
		respuestas => {
			res.status(200).json({
				ok: true,
				hospitales: respuestas[0],
				medicos: respuestas[1]
			});
		}
	);
});

function buscarHospitales(busqueda, regex) {
	return new Promise((resolve, reject) => {
		Hospital.find({ nombre: regex }, (err, hospitales) => {
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
		Medico.find({ nombre: regex }, (err, hospitales) => {
			if (err) {
				reject('Error al cargar hospitales', err);
			} else {
				resolve(hospitales);
			}
		});
	});
}
function buscarUsuarios(busqueda, regex) {
	return new Promise((resolve, reject) => {
		Medico.find({ nombre: regex }, (err, hospitales) => {
			if (err) {
				reject('Error al cargar hospitales', err);
			} else {
				resolve(hospitales);
			}
		});
	});
}

module.exports = app;
