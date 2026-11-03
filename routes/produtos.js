// ===================================================================================================================
// API - Produtos
// ===================================================================================================================
const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// GET Produtos
router.get('/', async (req, res) => {
  res.json(await Produto.find({}).sort('nome'));
});

module.exports = router;
