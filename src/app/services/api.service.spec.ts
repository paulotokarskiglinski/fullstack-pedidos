import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';

import {ApiService} from './api.service';
import {environment} from '../../environments/environment';
import {Pedido} from '../models/Pedido';

describe('ApiService', () => {
  let api: ApiService;
  let httpMock: HttpTestingController;

  const pedido = {
    cliente: 'c1',
    itens: [{produto: 'p1', precoUni: '2.00', multiplo: 2, quantidade: 10, rentabilidade: 'Ótima'}]
  } as Pedido;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    api = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('Requisição GET para a API: Clientes', () => {
    let res;
    api.getClientes().subscribe(r => res = r);
    const req = httpMock.expectOne(environment.apiUrl.clientes);
    expect(req.request.method).toBe('GET');
    req.flush([]);
    expect(res).toEqual([]);
  });

  it('Requisição GET para a API: Produtos', () => {
    api.getProdutos().subscribe();
    expect(httpMock.expectOne(environment.apiUrl.produtos).request.method).toBe('GET');
  });

  it('Requisição GET para a API: Pedidos', () => {
    api.getPedidos().subscribe();
    expect(httpMock.expectOne(environment.apiUrl.pedidos).request.method).toBe('GET');
  });

  it('Requisição POST para a API: Pedidos', () => {
    api.postPedido(pedido).subscribe();
    const req = httpMock.expectOne(environment.apiUrl.pedidos);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(pedido);
  });

  it('Requisição PUT para a API: Pedidos', () => {
    const update = {...pedido, pedido: 'abc'} as Pedido;
    api.updatePedido(update).subscribe();
    const req = httpMock.expectOne(environment.apiUrl.pedidos);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(update);
  });

  it('Requisição DELETE para API: Pedidos', () => {
    api.deletePedido('abc').subscribe();
    expect(httpMock.expectOne(environment.apiUrl.pedidos + '/abc').request.method).toBe('DELETE');
  });
});
