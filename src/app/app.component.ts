import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { QuantidadeValidator } from './validators/quantidade.validator';
import {FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { Pedido } from './models/Pedido';
import { Cliente } from './models/Cliente';
import { Produto } from './models/Produto';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CurrencyPipe]
})

export class AppComponent implements OnInit {
  @ViewChild('modalEditarItem') modalEditarItem;

  public title: string;
  public pedidos: any[] = [];
  public clientes: Cliente[] = [];
  public produtos: any[] = [];
  public editarPedidoForm: FormGroup;
  public cadastroPedidoForm: FormGroup;

  public auxPedido: any;

  constructor(private api: ApiService, private fb: FormBuilder, private cp: CurrencyPipe) {
    this.editarPedidoForm = this.fb.group({
      'pedido': [null, Validators.required],
      'cliente': [null, Validators.required],
      'itens': this.fb.array([])
    });

    this.cadastroPedidoForm = this.fb.group({
      'cliente': [null, Validators.required],
      'itens': this.fb.array([ this.novoItem() ])
    });
  }

  getClientes() {
    this.api.getClientes().subscribe((res: Cliente[]) => {
      this.clientes = res;
      this.getProdutos();
    });
  }

  getProdutos() {
    this.api.getProdutos().subscribe((res: Produto[]) => {
      this.produtos = res;
      this.getPedidos();
    });
  }

  getPedidos() {
    this.api.getPedidos().subscribe((res: Pedido[]) => {
      this.pedidos = res;
    });
  }

  deletePedido(id: string) {
    this.api.deletePedido(id).subscribe(res => {
      if (res) {
        this.getPedidos();
      }
    });
  }

  create(pedido: Pedido) {
    this.api.postPedido(pedido)
    this.api.postPedido(pedido)
      .subscribe(res => {
        if (res) {
          this.auxPedido = [];
          this.getPedidos();
          this.cadastroPedidoForm.reset();
          this.cadastroPedidoForm = this.fb.group({
            'cliente': [null, Validators.required],
            'itens': this.fb.array([ this.novoItem() ])
          });
        }
      });
  }

  update(pedido: Pedido) {
    this.api.updatePedido(pedido)
      .subscribe(res => {
        if (res) {
          this.getPedidos();
        }
      });
  }

  getClienteNome(id: string) {
    return this.clientes[this.clientes.findIndex(c => c._id === id)].nome;
  }

  getProdutoNome(id: string) {
    return this.produtos[this.produtos.findIndex(p => p._id === id)].nome;
  }

  novoItem(item?: any) {
    if (item) {
      return this.fb.group({
        'produto': [item.produto, Validators.required],
        'precoUni': [item.precoUni, Validators.required],
        'multiplo': [item.multiplo, Validators.required],
        'quantidade': [item.quantidade, Validators.required],
        'rentabilidade': [{ value: item.rentabilidade, disabled: true }, Validators.required]
      }, { validator: QuantidadeValidator.quantidadeMultiplo });
    } else {
      return this.fb.group({
        'produto': [null, Validators.required],
        'precoUni': [null, Validators.required],
        'multiplo': [null, Validators.required],
        'quantidade': [null, Validators.required],
        'rentabilidade': [{ value: null, disabled: true }, Validators.required]
      }, { validator: QuantidadeValidator.quantidadeMultiplo });
    }
  }

  adicionarItem(formulario) {
    const ctrl = <FormArray>formulario.controls['itens'];
    ctrl.push(this.novoItem());
  }

  removerItem(index: number, formulario: any) {
    const ctrl = <FormArray>formulario.controls['itens'];
    ctrl.removeAt(index);
  }

  selecionarProduto(index, idProduto, formulario) {
    this.produtos.filter(p => {
      if (p._id === idProduto) {
        (<FormArray>formulario.controls['itens']).at(index).get('precoUni').setValue(p.preco);
        (<FormArray>formulario.controls['itens']).at(index).get('multiplo').setValue(p.multiplo);
        (<FormArray>formulario.controls['itens']).at(index).get('quantidade').setValue(p.multiplo);
        (<FormArray>formulario.controls['itens']).at(index).get('rentabilidade').setValue('Boa');

        this.auxPedido = formulario.controls['itens'].value;
      }
    });
  }

  calcRentabilidade(index, precoUni, formulario) {
    precoUni = parseFloat(precoUni);

    if (precoUni > this.auxPedido[index].precoUni) {
      (<FormArray>formulario.controls['itens']).at(index).get('rentabilidade').setValue('Ótima');
    } else if (precoUni >= (this.auxPedido[index].precoUni - this.auxPedido[index].precoUni * 0.1) && precoUni <= this.auxPedido[index].precoUni) {
      (<FormArray>formulario.controls['itens']).at(index).get('rentabilidade').setValue('Boa');
    } else if (precoUni < (this.auxPedido[index].precoUni - this.auxPedido[index].precoUni * 0.1)) {
      (<FormArray>formulario.controls['itens']).at(index).get('rentabilidade').setValue('Ruim');
    }
  }

  abrirModalEditar(pedido: Pedido) {
    this.editarPedidoForm = this.fb.group({
      'pedido': [{ value: pedido._id, disabled: true }, Validators.required],
      'cliente': [pedido.cliente, Validators.required],
      'itens': this.fb.array([])
    });

    const ctrl = <FormArray>this.editarPedidoForm.controls['itens'];
    this.auxPedido = [];
    pedido.itens.forEach(i => {
      this.auxPedido.push(i);
      ctrl.push(this.novoItem(i));
    });

    $(this.modalEditarItem.nativeElement).modal('show');
  }

  ngOnInit() {
    this.title = 'Fullstack - Pedidos';
    this.getClientes();
  }
}
