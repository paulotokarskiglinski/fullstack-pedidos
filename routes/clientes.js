// ===================================================================================================================
// API - Clientes
// ===================================================================================================================
const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// GET Clientes
router.get('/', async (req, res) => {
  res.json(await Cliente.find({}).sort('nome'));
});

module.exports = router;
