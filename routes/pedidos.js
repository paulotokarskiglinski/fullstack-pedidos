// ===================================================================================================================
// API - Pedidos
// ===================================================================================================================
const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');

// GET
router.get('/', async (req, res) => {
  res.json(await Pedido.find({}));
});

// POST
router.post('/', async (req, res) => {
  res.json(await Pedido.create(req.body));
});

// PUT
router.put('/', async (req, res) => {
  const p = req.body;
  res.json(await Pedido.findByIdAndUpdate(p.pedido, p));
});

// DELETE
router.delete('/:id', async (req, res) => {
  res.json(await Pedido.findByIdAndDelete(req.params.id));
});

module.exports = router;
