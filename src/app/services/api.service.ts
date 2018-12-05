import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  private apiUrl = environment.apiUrl;

  public constructor(private http: HttpClient) { }

  getHttpOptions() {
    return { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
  }

  // Clientes
  // GET
  getClientes(): Observable<any[]> {
    return this.http.get(this.apiUrl.clientes, this.getHttpOptions()).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // Produtos
  // GET
  getProdutos(): Observable<any[]> {
    return this.http.get(this.apiUrl.produtos, this.getHttpOptions()).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // Pedidos
  // GET
  getPedidos(): Observable<any[]> {
    return this.http.get(this.apiUrl.pedidos, this.getHttpOptions()).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // POST
  postPedido(model: any) {
    return this.http.post(this.apiUrl.pedidos, model, this.getHttpOptions());
  }

  // PUT
  updatePedido(model: any) {
    return this.http.put(this.apiUrl.pedidos, model, this.getHttpOptions());
  }

  // DELETE
  deletePedido(id: string) {
    return this.http.delete(this.apiUrl.pedidos + '/' + id, this.getHttpOptions());
  }

}
