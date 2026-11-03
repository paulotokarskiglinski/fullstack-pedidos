const mongoose = require('mongoose');

const Produto = new mongoose.Schema({
  id: Number,
  nome: String,
  preco: Number,
  multiplo: Number
});

module.exports = mongoose.model('produto', Produto);
