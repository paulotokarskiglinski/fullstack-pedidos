import {AppComponent} from './app.component';
import {ApiService} from './services/api.service';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AppComponent', () => {
  let model: any;
  let apiService: ApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('', { enabled: false })
      ],
      providers: [ApiService]
    }).compileComponents();

    apiService = TestBed.get(ApiService);
  }));

  /*
   * Verificar se o formulário de cadastro foi implementado
   * É obrigatório que o formulário de cadastro esteja implementado
   */
  it('Deve conter um formulário de cadastro', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#cadastroPedidoForm').id).toContain('cadastroPedidoForm');
  }));

  /*
   * Verificar se o formulário de edição foi implementado
   * É obrigatório que o formulário de edição esteja implementado
   */
  it('Deve conter um formulário de edição', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#editarPedidoForm').id).toContain('editarPedidoForm');
  }));

  /*
   * Testar requisição para a API: Clientes
   * Deve retornar um array de objetos maior ou igual a 0
   */
  it('Requisição GET para a API: Clientes', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(apiService.getClientes().subscribe(res => {
      expect(res.length).toBeGreaterThanOrEqual(0);
    }));
  }));

  /*
   * Testar requisição para a API: Produtos
   * Deve retornar um array de objetos maior ou igual a 0
   */
  it('Requisição GET para a API: Produtos', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(apiService.getProdutos().subscribe(res => {
      expect(res.length).toBeGreaterThanOrEqual(0);
    }));
  }));

  /*
   * Testar requisição para a API: Pedidos
   * Deve retornar um array de objetos maior ou igual a 0
   */
  it('Requisição GET para a API: Pedidos', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(apiService.getPedidos().subscribe(res => {
      expect(res.length).toBeGreaterThanOrEqual(0);
    }));
  }));

  /*
   * Testar requisição para a API: Pedidos
   * Deve retornar um valor válido,
   * indicando assim que o cadastro foi um sucesso
   */
  it('Requisição POST para a API: Pedidos', waitForAsync(() => {
    model = {
      cliente: '5cd9bafafb6fc0230bd3b24d',
      itens: [
        {
          multiplo: 2,
          quantidade: 10,
          precoUni: '2.00',
          rentabilidade: 'Ótima',
          produto: '5cd9bebffb6fc0230bd3b5e3'
        }
      ]
    };

    expect(apiService.postPedido(model).subscribe(res => {
      model = res;
      expect(res).not.toBe(null);
    }));
  }));

  /*
   * Testar requisição para a API: Pedidos
   * Deve retornar um valor válido,
   * indicando assim que a atualização foi um sucesso
   */
  it('Requisição PUT para a API: Pedidos', waitForAsync(() => {
    const update: any = {
      pedido: model._id,
      itens: [
        {
          multiplo: 4,
          quantidade: 40,
          precoUni: '2.30',
          rentabilidade: 'Ótima',
          produto: '5cd9bebffb6fc0230bd3b5e3'
        }
      ]
    };

    expect(apiService.updatePedido(update).subscribe(res => {
      expect(res).not.toBe(null);
    }));
  }));

  /*
   * Testar requisição para a API: Pedidos
   * Deve retornar um valor válido,
   * indicando assim que o registro foi deletado com sucesso
   */
  it('Requisição DELETE para API: Pedidos', waitForAsync(() => {
    expect(apiService.deletePedido(model._id).subscribe(res => {
      expect(res).not.toBe(null);
    }));
  }));

});
