// ===================================================================================================================
// API - Pedidos
// ===================================================================================================================
var express = require('express');
var router = express.Router();

// GET
router.get('/', (req, res, next) => {
	pedido.find({}, (err, models) => {
		if (err) console.error(err)
		else res.json(models);
	});
})

// POST
router.post('/', (req, res, next) => {
	var p = req.body;

	pedido.create(p, (err, model) => {
		if (err) console.error(err);
		else res.json(model);
	});
})

// PUT
router.put('/', (req, res, next) => {
	var p = req.body;
	pedido.findOneAndUpdate(p.pedido, p, (err, model) => {
		if (err) console.error(err);
		else res.json(model);
	});
})

// DELETE
router.delete('/:id', (req, res, next) => {
	var id = req.params.id;

	pedido.findByIdAndRemove(id, (err, model) => {
        if (err) console.error(err);
        else res.json(model);
    })
})

module.exports = router;
