import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from './services/api.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AppComponent', () => {
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [ApiService]
    }).compileComponents();

    apiService = TestBed.get(ApiService);
  }));

  /*
   * Verificar se o formulário de cadastro foi implementado
   * É obrigatório que o formulário de cadastro esteja implementado
   */
  it('Deve conter um formulário de cadastro', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#cadastroPedidoForm').id).toContain('cadastroPedidoForm');
  }));

  /*
   * Verificar se o formulário de edição foi implementado
   * É obrigatório que o formulário de edição esteja implementado
   */
  it('Deve conter um formulário de edição', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#editarPedidoForm').id).toContain('editarPedidoForm');
  }));

  /*
   * Testar requisição para a API: Clientes
   * Deve retornar um array de objetos maior ou igual a 0
   */
  it('Requisição da API: Clientes', async(() => {
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
  it('Requisição da API: Produtos', async(() => {
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
  it('Requisição da API: Pedidos', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(apiService.getPedidos().subscribe(res => {
      expect(res.length).toBeGreaterThanOrEqual(0);
    }));
  }));

});
