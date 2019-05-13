import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {Pedido} from './../models/Pedido';
import {Cliente} from './../models/Cliente';
import {Produto} from './../models/Produto';

@Injectable()
export class ApiService {

  private apiUrl = environment.apiUrl;

  public constructor(private http: HttpClient) {
  }

  getHttpOptions() {
    return {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  }

  // Clientes
  // GET
  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.apiUrl.clientes, this.getHttpOptions()).pipe(
      map((res: Cliente[]) => {
        return res;
      })
    );
  }

  // Produtos
  // GET
  getProdutos(): Observable<Produto[]> {
    return this.http.get(this.apiUrl.produtos, this.getHttpOptions()).pipe(
      map((res: Produto[]) => {
        return res;
      })
    );
  }

  // Pedidos
  // GET
  getPedidos(): Observable<Pedido[]> {
    return this.http.get(this.apiUrl.pedidos, this.getHttpOptions()).pipe(
      map((res: Pedido[]) => {
        return res;
      })
    );
  }

  // POST
  postPedido(model: Pedido) {
    return this.http.post(this.apiUrl.pedidos, model, this.getHttpOptions());
  }

  // PUT
  updatePedido(model: Pedido) {
    return this.http.put(this.apiUrl.pedidos, model, this.getHttpOptions());
  }

  // DELETE
  deletePedido(id: string) {
    return this.http.delete(this.apiUrl.pedidos + '/' + id, this.getHttpOptions());
  }

}
