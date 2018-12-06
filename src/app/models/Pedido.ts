/*
 * Classe: Pedido
 */
export class Pedido {
  _id: string;
  cliente: string;
  itens: [
    {
      produto: string,
      precoUni: string,
      multiplo: number,
      quantidade: number,
      rentabilidade: string
    }
  ];
}
