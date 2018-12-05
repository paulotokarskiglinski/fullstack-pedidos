const path = require('path');
var express = require('express');
var router = express.Router();

// Index
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname + '/dist/fullstack-pedidos-front/index.html'));
});

module.exports = router;
