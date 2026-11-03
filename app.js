const path = require('path');
const logger = require('morgan');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const app = express();

const index = require('./routes/index');
const pedidos = require('./routes/pedidos');
const clientes = require('./routes/clientes');
const produtos = require('./routes/produtos');

// CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist/fullstack-pedidos/browser')));

// Rotas
app.use('/', index);
app.use('/pedidos', pedidos);
app.use('/clientes', clientes);
app.use('/produtos', produtos);

// 4O4
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
const API = ['/pedidos', '/clientes', '/produtos'];

app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status >= 500) console.error(err);

  if (API.some(rota => req.originalUrl.startsWith(rota))) {
    return res.status(status).json({erro: err.message});
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(status);
  res.render('error');
});

module.exports = app;
