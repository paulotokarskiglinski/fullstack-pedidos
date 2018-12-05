// ===================================================================================================================
// API - Produtos
// ===================================================================================================================
var express = require('express');
var router = express.Router();

// GET Produtos
router.get('/', (req, res, next) => {
	produto.find({}).sort('nome').exec((err, models) => {
		if (err) console.error(err)
		else res.json(models);
	});
})

module.exports = router;
