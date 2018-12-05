const mongoose = require('mongoose');
const DATABASE = require('./../libs/config').DATABASE;

module.exports = function() {
	mongoose.connect(DATABASE, { useNewUrlParser: true });

	const Schema = require('mongoose').Schema, ObjectId = Schema.ObjectId;

	const Cliente = Schema({
		id: Number,
		nome: String
	});

	return mongoose.model('cliente', Cliente);
}
