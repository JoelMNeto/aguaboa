import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { ListComponent } from '../../shared/components/list/list.component';
import { ClienteService } from '../../shared/services/cliente.service';
import {
  ListColumn,
  Pagination,
} from '../../shared/interfaces/list-component.interface';
import {
  ClienteFiltros,
  ClienteInformacoes,
} from '../../shared/interfaces/cliente.interface';
import { UtilsService } from '../../shared/services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
})
export class ClienteComponent implements OnInit {
  displayedColumns: ListColumn[] = [
    {
      label: 'Código',
      value: 'id',
    },
    {
      label: 'Nome',
      value: 'nome',
    },
    {
      label: 'Contato',
      value: 'contato',
    },
    {
      label: 'Saldo em conta',
      value: 'saldoEmConta',
      color: (row: any) => this.getSaldoColor(row),
      format: this.utilsService.formataValorMonetario,
    },
    {
      label: 'Logradouro',
      value: 'endereco.logradouro',
    },
    {
      label: 'Número',
      value: 'endereco.numero',
    },
    {
      label: 'Bairro',
      value: 'endereco.bairro',
    },
    {
      label: '',
      value: 'actionDelete',
      color: 'accent',
      tooltipMessage: 'Desativar cliente',
      isAction: true,
      icon: 'delete',
      action: (row: ClienteInformacoes) => this.desativaCliente(row),
    },
  ];

  pageSizes = [];

  filter: ClienteFiltros = {};

  getClientes = (pagination: Pagination, filter: any) =>
    this.service?.getClientes(pagination, filter);

  atualizaLista = () => {};

  constructor(
    private headerService: HeaderService,
    private service: ClienteService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Clientes');
  }

  desativaCliente(cliente: ClienteInformacoes) {
    this.dialog
      .open(DialogComponent, {
        data: {
          title: 'Desativar cliente',
          message: `Tem certeza que deseja desativar o cliente: ${cliente.id} - ${cliente.nome}?`,
          askConfirmation: true,
        },
      })
      .afterClosed()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.service.desativaCliente(cliente.id).subscribe(() => {
          this.snackbar.open('Cliente desativado com sucesso!', 'Ok');

          this.atualizaLista();
        });
      });
  }

  private getSaldoColor(row: any) {
    if (row?.saldoEmConta == 0) {
      return '';
    }

    return row?.saldoEmConta < 0 ? 'danger' : 'success';
  }

  ngOnDestroy(): void {
    this.headerService.setPageTitle('');
  }
}
