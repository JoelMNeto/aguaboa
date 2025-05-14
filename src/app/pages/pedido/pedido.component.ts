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
  FORMAS_PAGAMENTO,
  TIPOS_PEDIDO,
  STATUS_PEDIDO,
  PedidoAlteracao,
  StatusEnum,
} from '../../shared/interfaces/pedido.interface';
import { ListComponent } from '../../shared/components/list/list.component';
import { UtilsService } from '../../shared/services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { DialogUpdateComponent } from './dialog/dialog-update/dialog-update.component';

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
      color: (row: any) => StatusEnum.PAGO === row?.status ? 'success' : 'danger',
      format: (value: any) =>
        STATUS_PEDIDO.find((f) => f.value === value)?.viewValue,
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
      format: (value: any) =>
        FORMAS_PAGAMENTO.find((e) => e.value === value)?.viewValue,
    },
    {
      label: 'Tipo',
      value: 'tipo',
      format: (value: any) =>
        TIPOS_PEDIDO.find((e) => e.value === value)?.viewValue,
    },
    {
      label: '',
      value: 'actionDelete',
      color: 'accent',
      tooltipMessage: 'Excluir pedido',
      isAction: true,
      icon: 'delete',
      action: (row: PedidoInformacoes) => this.desativaPedido(row),
    },
    {
      label: '',
      value: 'actionUpdate',
      color: 'primary',
      tooltipMessage: 'Baixar pedido',
      isAction: true,
      icon: 'done',
      action: (row: PedidoInformacoes) => this.alteraPedido(row),
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

  private alteraPedido(pedido: PedidoInformacoes): void {
    this.dialog
      .open(DialogUpdateComponent, {
        data: {
          title: `Baixar pedido - Valor: ${this.utilsService.formataValorMonetario(
            pedido?.valorAtualizado
          )}`,
          pedido,
        },
      })
      .afterClosed()
      .pipe(
        filter((item: PedidoAlteracao) => item !== null && item !== undefined)
      )
      .subscribe((item: PedidoAlteracao) => {
        this.service.alteraPedido(item).subscribe(() => {
          this.snackbar.open('Pedido baixado com sucesso!', 'Ok');
        });
      });
  }

  ngOnDestroy(): void {
    this.headerService.setPageTitle('');
  }
}
