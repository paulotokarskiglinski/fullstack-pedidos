// ===================================================================================================================
// API - Clientes
// ===================================================================================================================
var express = require('express');
var router = express.Router();

// GET Clientes
router.get('/', (req, res, next) => {
	cliente.find({}).sort('nome').exec((err, models) => {
		if (err) console.error(err)
		else res.json(models);
	});
})

module.exports = router;
