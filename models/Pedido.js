const mongoose = require('mongoose');

const Pedido = new mongoose.Schema({
  cliente: String,
  itens: [{
    produto: String,
    precoUni: Number,
    multiplo: Number,
    quantidade: Number,
    rentabilidade: String
  }]
});

module.exports = mongoose.model('pedido', Pedido);
