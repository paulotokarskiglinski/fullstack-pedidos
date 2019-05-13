const mongoose = require('mongoose');
const DATABASE = require('./../libs/config').DATABASE;

module.exports = function () {
  mongoose.connect(DATABASE, {useNewUrlParser: true});

  const Schema = require('mongoose').Schema, ObjectId = Schema.ObjectId;

  const Produto = Schema({
    id: Number,
    nome: String,
    preco: Number,
    multiplo: Number
  });

  return mongoose.model('produto', Produto);
};
