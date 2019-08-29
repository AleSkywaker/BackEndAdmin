const express = require('express');
const app = express();

const Hospital = require('../models/hospital');

app.get('/todo/:busqueda', (req, res, next) => {
	let busqueda = req.params.busqueda;

	Hospital.find({ nombre: busqueda }, (err, hospitales) => {
		if (err) {
			console.log('error', err);
		} else {
			res.status(200).json({
				ok: true,
				hospitales
			});
		}
	});
});

module.exports = app;
