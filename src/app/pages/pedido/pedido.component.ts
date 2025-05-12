import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import {
  ListColumn,
  Pagination,
} from '../../shared/interfaces/list-component.interface';
import { PedidoService } from '../../shared/services/pedido.service';
import {
  PedidoFiltros,
  PedidoInformacoes,
  StatusEnum,
  TipoPedidoEnum,
  FORMAS_PAGAMENTO,
  TIPOS_PEDIDO,
  STATUS_PEDIDO,
} from '../../shared/interfaces/pedido.interface';
import { ListComponent } from '../../shared/components/list/list.component';
import { UtilsService } from '../../shared/services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

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
      format: (value: any) => STATUS_PEDIDO.find(f => f.value === value)?.viewValue,
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
      format: (value: any) => FORMAS_PAGAMENTO.find(e => e.value === value)?.viewValue,
    },
    {
      label: 'Tipo',
      value: 'tipo',
      format: (value: any) => TIPOS_PEDIDO.find(e => e.value === value)?.viewValue,
    },
    {
      label: '',
      value: 'action',
      icon: 'delete',
      action: (row: PedidoInformacoes) => this.desativaPedido(row),
    },
  ];

  pageSizes = [];

  filter: PedidoFiltros = {};

  getPedidos = (pagination: Pagination, filter: any) =>
    this.service?.getPedidos(pagination, filter);

  constructor(
    private headerService: HeaderService,
    private service: PedidoService,
    private utilsService: UtilsService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Pedidos');
  }

  private desativaPedido(pedido: PedidoInformacoes): void {
    this.dialog
      .open(DialogComponent, {
        data: {
          title: 'Excluir Pedido',
          message: `Tem certeza que deseja excluir o Pedido: ${pedido.id}?`,
          askConfirmation: true,
        },
      })
      .afterClosed()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.service.desativaPedido(pedido.id).subscribe(() => {
          this.snackbar.open('Pedido excluído com sucesso!', 'Ok');
        });
      });
  }
}
