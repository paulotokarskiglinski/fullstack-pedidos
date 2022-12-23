import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from './services/api.service';
import {QuantidadeValidator} from './validators/quantidade.validator';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';

import {Pedido} from './models/Pedido';
import {Cliente} from './models/Cliente';
import {Produto} from './models/Produto';
import {SwUpdate} from '@angular/service-worker';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CurrencyPipe, UntypedFormBuilder]
})

export class AppComponent implements OnInit {
  @ViewChild('modalEditarItem') modalEditarItem;

  public auxPedido: any;
  public pedidos: Pedido[] = [];
  public produtos: Produto[] = [];
  public clientes: Cliente[] = [];
  public editarPedidoForm: UntypedFormGroup;
  public cadastroPedidoForm: UntypedFormGroup;

  // Controle para os alertas dos formulários
  public alerts: any = {
    editar: {sucesso: false, erro: false},
    excluir: {sucesso: false, erro: false},
    cadastro: {sucesso: false, erro: false}
  };

  constructor(private api: ApiService, private fb: UntypedFormBuilder, private updates: SwUpdate) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    });

    this.editarPedidoForm = this.fb.group({
      'pedido': [null, Validators.required],
      'cliente': [null, Validators.required],
      'itens': this.fb.array([])
    });

    this.cadastroPedidoForm = this.fb.group({
      'cliente': [null, Validators.required],
      'itens': this.fb.array([this.novoItem()])
    });
  }

  ngOnInit(): void {
    this.getClientes();
  }

  /*
   * Parametros: none
   * Faz a requisição para a API e retorna os Clientes cadastrados
   * Executa a função getProdutos()
   */
  getClientes(): void {
    this.api.getClientes().subscribe((res: Cliente[]) => {
      this.clientes = res;
      this.getProdutos();
    });
  }

  /*
   * Parametros: none
   * Faz a requisição para a API e retorna os Produtos cadastrados
   * Executa a função getPedidos()
   */
  getProdutos(): void {
    this.api.getProdutos().subscribe((res: Produto[]) => {
      this.produtos = res;
      this.getPedidos();
    });
  }

  /*
   * Parametros: none
   * Faz a requisição para a API e retorna os Pedidos cadastrados
   */
  getPedidos(): void {
    this.api.getPedidos().subscribe((res: Pedido[]) => {
      this.pedidos = res;
    });
  }

  /*
   * Parametros: pedido (models = Pedido)
   * Faz o cadastro do pedido. Recebe o valor do formulário de cadastro (cadastroPedidoForm)
   * Em caso de sucesso ou erro o usuário é notificado
   */
  create(pedido: Pedido): void {
    this.api.postPedido(pedido)
      .subscribe(res => {
        if (res) {
          this.auxPedido = [];
          this.getPedidos();
          this.cadastroPedidoForm.reset();
          this.cadastroPedidoForm = this.fb.group({
            'cliente': [null, Validators.required],
            'itens': this.fb.array([this.novoItem()])
          });
          this.alerts.cadastro.sucesso = true;
          setInterval(() => {
            this.alerts.cadastro.sucesso = false;
          }, 5000);
        } else {
          this.alerts.cadastro.erro = true;
          setInterval(() => {
            this.alerts.cadastro.erro = false;
          }, 5000);
        }
      });
  }

  /*
   * Parametros: pedido (models = Pedido)
   * Faz a atualização do pedido. Recebe o valor do formulário de edição (editarPedidoForm)
   * Em caso de sucesso ou erro o usuário é notificado
   */
  update(pedido: Pedido): void {
    this.api.updatePedido(pedido)
      .subscribe(res => {
        if (res) {
          this.getPedidos();
          this.alerts.editar.sucesso = true;
          setInterval(() => {
            this.alerts.editar.sucesso = false;
          }, 5000);
        } else {
          this.alerts.editar.erro = true;
          setInterval(() => {
            this.alerts.editar.erro = false;
          }, 5000);
        }
      });
  }

  /*
   * Parametros: id do pedido (string)
   * Exclui o pedido o pedido
   * Em caso de sucesso ou erro o usuário é notificado
   */
  delete(id: string): void {
    this.api.deletePedido(id).subscribe(res => {
      if (res) {
        this.getPedidos();
        this.alerts.excluir.sucesso = true;
        setInterval(() => {
          this.alerts.excluir.sucesso = false;
        }, 5000);
      } else {
        this.alerts.excluir.erro = true;
        setInterval(() => {
          this.alerts.excluir.erro = false;
        }, 5000);
      }
    });
  }

  /*
   * Parametros: id do Cliente (string)
   * Retorna o nome do Cliente (string)
   */
  getClienteNome(id: string): string {
    return this.clientes[this.clientes.findIndex(c => c._id === id)].nome;
  }

  /*
   * Parametros: id do Produto (string)
   * Retorna o nome do Produto (string)
   */
  getProdutoNome(id: string): string {
    return this.produtos[this.produtos.findIndex(p => p._id === id)].nome;
  }

  /*
   * Parametros: item (opicional)
   * Adiciona uma linha ao formulário para o cadastro de um novo Produto
   */
  novoItem(item?: any): UntypedFormGroup {
    // Caso se tenha os valores para os campos
    if (item) {
      return this.fb.group({
        'produto': [item.produto, Validators.required],
        'multiplo': [item.multiplo, Validators.required],
        'precoUni': [item.precoUni, Validators.compose([Validators.required])],
        'quantidade': [item.quantidade, Validators.compose([Validators.min(0), Validators.required])],
        'rentabilidade': [{value: item.rentabilidade, disabled: true}, Validators.required]
      }, {validator: QuantidadeValidator.quantidadeMultiplo});
      // Caso seja um campo novo
    } else {
      return this.fb.group({
        'produto': [null, Validators.required],
        'multiplo': [null, Validators.required],
        'precoUni': [null, Validators.compose([Validators.required])],
        'quantidade': [null, Validators.compose([Validators.min(0), Validators.required])],
        'rentabilidade': [{value: null, disabled: true}, Validators.required]
      }, {validator: QuantidadeValidator.quantidadeMultiplo});
    }
  }

  /*
  * Parametros: formulário
  * Adiciona um novo item na lista de itens do formulário para cadastro no formulário
  */
  adicionarItem(formulario: any): void {
    const ctrl = <UntypedFormArray>formulario.controls['itens'];
    ctrl.push(this.novoItem());
  }

  /*
  * Parametros: index (posição na lista de itens), formulário
  * Remove o item da lista
  */
  removerItem(index: number, formulario: any): void {
    const ctrl = <UntypedFormArray>formulario.controls['itens'];
    ctrl.removeAt(index);
  }

  /*
  * Parametros: index (posição na lista de itens), id do produto, formulário
  * Quando o usuário selecionar o produto no <select> do formulário esta função completa os
  * outros campos do formulário
  */
  selecionarProduto(index: number, idProduto: string, formulario: any): void {
    this.produtos.filter(p => {
      if (p._id === idProduto) {
        (<UntypedFormArray>formulario.controls['itens']).at(index).get('precoUni').setValue(p.preco);
        (<UntypedFormArray>formulario.controls['itens']).at(index).get('multiplo').setValue(p.multiplo);
        (<UntypedFormArray>formulario.controls['itens']).at(index).get('quantidade').setValue(p.multiplo);
        (<UntypedFormArray>formulario.controls['itens']).at(index).get('rentabilidade').setValue('Boa');

        this.auxPedido = formulario.controls['itens'].value;
      }
    });
  }

  /*
  * Parametros: index (posição na lista de itens), preço da unidade, formulário
  * Quando o usuário alterar o preço da unidade a rentabilidade é automaticamente calculada
  * Caso a rentabilidade seja ruim o formulário é invalidado
  */
  calcRentabilidade(index: number, precoUni: any, formulario: any): void {
    precoUni = parseFloat(precoUni);
    formulario.controls['itens'].at(index).get('precoUni').setValidators(Validators.min(this.auxPedido[index].precoUni - this.auxPedido[index].precoUni * 0.1));

    if (precoUni > this.auxPedido[index].precoUni) {
      (<UntypedFormArray>formulario.controls['itens']).at(index).get('rentabilidade').setValue('Ótima');
    } else if (precoUni >= (this.auxPedido[index].precoUni - this.auxPedido[index].precoUni * 0.1) && precoUni <= this.auxPedido[index].precoUni) {
      (<UntypedFormArray>formulario.controls['itens']).at(index).get('rentabilidade').setValue('Boa');
    } else if (precoUni < (this.auxPedido[index].precoUni - this.auxPedido[index].precoUni * 0.1)) {
      (<UntypedFormArray>formulario.controls['itens']).at(index).get('rentabilidade').setValue('Ruim');
    }
  }

  /*
  * Parametros: pedido (model = Pedido)
  * Abre o modal (modalEditarItem) para a edição de um pedido já cadastrado
  * Completa automaticamente os campos do formulário de edição (editarPedidoForm)
  */
  abrirModalEditar(pedido: Pedido): void {
    this.editarPedidoForm = this.fb.group({
      'pedido': [{value: pedido._id, disabled: true}, Validators.required],
      'cliente': [pedido.cliente, Validators.required],
      'itens': this.fb.array([])
    });

    const ctrl = <UntypedFormArray>this.editarPedidoForm.controls['itens'];
    this.auxPedido = [];
    pedido.itens.forEach(i => {
      this.auxPedido.push(i);
      ctrl.push(this.novoItem(i));
    });

    $(this.modalEditarItem.nativeElement).modal('show');
  }
}
