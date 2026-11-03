const mongoose = require('mongoose');

const Cliente = new mongoose.Schema({
  id: Number,
  nome: String
});

module.exports = mongoose.model('cliente', Cliente);
