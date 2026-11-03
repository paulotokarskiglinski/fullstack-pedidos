// ===================================================================================================================
// Popula o banco com Clientes e Produtos de exemplo
// Pode ser executado várias vezes sem duplicar os registros (upsert pelo campo id)
// ===================================================================================================================
const mongoose = require('mongoose');
const connect = require('../db');
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');

const clientes = [
  {id: 1, nome: 'Darth Vader'},
  {id: 2, nome: 'Obi-Wan Kenobi'},
  {id: 3, nome: 'Luke Skywalker'},
  {id: 4, nome: 'Leia Organa'}
];

const produtos = [
  {id: 1, nome: 'Millenium Falcon', preco: 550000.00, multiplo: 1},
  {id: 2, nome: 'X-Wing', preco: 60000.00, multiplo: 2},
  {id: 3, nome: 'Super Star Destroyer', preco: 4570000.00, multiplo: 1},
  {id: 4, nome: 'TIE Fighter', preco: 75000.00, multiplo: 2},
  {id: 5, nome: 'Lightsaber', preco: 6000.00, multiplo: 5}
];

function upsert(model, docs) {
  return model.bulkWrite(docs.map(doc => ({
    updateOne: {filter: {id: doc.id}, update: {$set: doc}, upsert: true}
  })));
}

async function seed() {
  await connect();
  await upsert(Cliente, clientes);
  await upsert(Produto, produtos);
  console.log(`Clientes: ${await Cliente.countDocuments()} | Produtos: ${await Produto.countDocuments()}`);
}

seed()
  .catch(err => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
