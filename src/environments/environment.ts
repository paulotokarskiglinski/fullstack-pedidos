/*
 * Para executat localment
 * Servidor: http://localhost
 * Porta: 3000
 */

export const environment = {
  production: false,
  apiUrl: {
    pedidos: 'http://localhost:3000/pedidos',
    produtos: 'http://localhost:3000/produtos',
    clientes: 'http://localhost:3000/clientes'
  }
};
