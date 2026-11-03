/*
 * Build de produção servido pelo próprio servidor Express (npm run build && npm start)
 * A API fica na mesma origem da aplicação
 */

export const environment = {
  production: true,
  apiUrl: {
    pedidos: '/pedidos',
    produtos: '/produtos',
    clientes: '/clientes'
  }
};
