import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import {
  ListColumn,
  Pagination,
} from '../../shared/interfaces/list-component.interface';
import { PedidoService } from '../../shared/services/pedido.service';
import {
  FormaPagamentoEnum,
  PedidoFiltros,
  StatusEnum,
  TipoPedidoEnum,
} from '../../shared/interfaces/pedido.interface';
import { ListComponent } from '../../shared/components/list/list.component';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.scss',
})
export class PedidoComponent implements OnInit {
  displayedColumns: ListColumn[] = [
    {
      label: 'Código',
      value: 'id',
    },
    {
      label: 'Data',
      value: 'data',
      format: (value: string) => {
        let data = new Date(value);

        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
      },
    },
    {
      label: 'Status',
      value: 'status',
      format: (value: any) => StatusEnum[value],
    },
    {
      label: 'Cliente',
      value: 'cliente.nome',
    },
    {
      label: 'Valor',
      value: 'valorTotal',
      format: this.utilsService.formataValorMonetario,
    },
    {
      label: 'Valor Atualizado',
      value: 'valorAtualizado',
      format: this.utilsService.formataValorMonetario,
    },
    {
      label: 'Valor Pago',
      value: 'valorPago',
      format: this.utilsService.formataValorMonetario,
    },
    {
      label: 'Forma de pagamento',
      value: 'formaPagamento',
      format: (value: any) => FormaPagamentoEnum[value],
    },
    {
      label: 'Tipo',
      value: 'tipo',
      format: (value: any) => TipoPedidoEnum[value],
    },
  ];

  pageSizes = [];

  filter: PedidoFiltros = {};

  getPedidos = (pagination: Pagination, filter: any) =>
    this.service?.getPedidos(pagination, filter);

  constructor(
    private headerService: HeaderService,
    private service: PedidoService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Pedidos');
  }
}
