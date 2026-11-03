import {AppComponent} from './app.component';
import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideServiceWorker} from '@angular/service-worker';
import {UntypedFormArray} from '@angular/forms';

import {environment} from '../environments/environment';
import {Produto} from './models/Produto';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideServiceWorker('', {enabled: false})
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  /*
   * Verificar se o formulário de cadastro foi implementado
   * É obrigatório que o formulário de cadastro esteja implementado
   */
  it('Deve conter um formulário de cadastro', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#cadastroPedidoForm').id).toContain('cadastroPedidoForm');
  });

  /*
   * Verificar se o formulário de edição foi implementado
   * É obrigatório que o formulário de edição esteja implementado
   */
  it('Deve conter um formulário de edição', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#editarPedidoForm').id).toContain('editarPedidoForm');
  });

  /*
   * Ao iniciar, carrega Clientes, Produtos e Pedidos em sequência
   */
  it('Deve carregar Clientes, Produtos e Pedidos ao iniciar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    httpMock.expectOne(environment.apiUrl.clientes).flush([{_id: 'c1', id: '1', nome: 'Cliente'}]);
    httpMock.expectOne(environment.apiUrl.produtos).flush([]);
    httpMock.expectOne(environment.apiUrl.pedidos).flush([]);
    httpMock.verify();

    expect(fixture.componentInstance.clientes.length).toBe(1);

    // A lista deve aparecer no select assim que os dados chegam, sem interação do usuário
    fixture.detectChanges();
    const opcoes = (fixture.nativeElement as HTMLElement).querySelectorAll('#selectCliente option');
    expect(opcoes.length).toBe(2);
    expect(opcoes[1].textContent).toBe('Cliente');
  });

  /*
   * Quando a API retorna erro, o usuário deve ser notificado
   */
  it('Deve exibir o alerta de erro quando a exclusão falhar', () => {
    vi.useFakeTimers();
    const component = TestBed.createComponent(AppComponent).componentInstance;

    component.delete('abc');
    httpMock.expectOne(environment.apiUrl.pedidos + '/abc')
      .flush({erro: 'falha'}, {status: 500, statusText: 'Internal Server Error'});
    expect(component.alerts.excluir.erro).toBe(true);

    vi.advanceTimersByTime(5000);
    expect(component.alerts.excluir.erro).toBe(false);
    vi.useRealTimers();
  });

  /*
   * A rentabilidade é calculada a partir do preço do produto:
   * acima do preço = Ótima, até 10% abaixo = Boa, mais de 10% abaixo = Ruim (formulário inválido)
   */
  it('Deve calcular a rentabilidade do item', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const form = component.cadastroPedidoForm;
    const item = (form.controls['itens'] as UntypedFormArray).at(0);

    component.produtos = [{_id: 'p1', id: '1', nome: 'Produto', preco: '100', multiplo: '2'} as Produto];
    form.get('cliente').setValue('c1');
    item.get('produto').setValue('p1');
    component.selecionarProduto(0, 'p1', form);
    expect(item.get('rentabilidade').value).toBe('Boa');
    expect(item.get('quantidade').value).toBe('2');

    component.calcRentabilidade(0, '110', form);
    expect(item.get('rentabilidade').value).toBe('Ótima');

    component.calcRentabilidade(0, '90', form);
    item.get('precoUni').setValue('90');
    expect(item.get('rentabilidade').value).toBe('Boa');
    expect(form.valid).toBe(true);

    component.calcRentabilidade(0, '89.99', form);
    item.get('precoUni').setValue('89.99');
    expect(item.get('rentabilidade').value).toBe('Ruim');
    expect(form.valid).toBe(false);
  });
});
