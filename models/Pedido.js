const mongoose = require('mongoose');
const DATABASE = require('./../libs/config').DATABASE;

module.exports = function () {
  mongoose.connect(DATABASE, {useNewUrlParser: true});

  const Schema = require('mongoose').Schema, ObjectId = Schema.ObjectId;

  const Pedido = Schema({
    cliente: String,
    itens: [{
      produto: String,
      precoUni: Number,
      multiplo: Number,
      quantidade: Number,
      rentabilidade: String
    }]
  });

  return mongoose.model('pedido', Pedido);
};
