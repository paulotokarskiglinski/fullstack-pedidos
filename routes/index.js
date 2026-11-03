const path = require('path');
const express = require('express');
const router = express.Router();

// Index
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/fullstack-pedidos/browser/index.html'));
});

module.exports = router;
