const express = require('express');
const app = express();

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

app.get('/todo/:busqueda', (req, res, next) => {
	let busqueda = req.params.busqueda;
	let regex = new RegExp(busqueda, 'i');

	Promise.all([buscarHospitales(busqueda, regex), buscarMedicos(busqueda, regex)]).then();

	buscarHospitales(regex).then(hospitales => {
		res.status(200).json({
			ok: true,
			hospitales
		});
	});
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

module.exports = app;
