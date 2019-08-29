const express = require('express');
const app = express();

const Hospital = require('../models/hospital');

app.get('/todo/:busqueda', (req, res, next) => {
	let busqueda = req.params.busqueda;

	let regex = new RegExp(busqueda, 'i');

	Hospital.find({ nombre: regex }, (err, hospitales) => {
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

function buscarHospital(busqueda, regex) {

  return new Promise((resolve, reject)=>{

    Hospital.find({ nombre: busqueda }, (err, hospitales) => {

      if(err){
        
      }

    });


  })

}

module.exports = app;
