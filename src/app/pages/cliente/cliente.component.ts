import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { ListComponent } from '../../shared/components/list/list.component';
import { ClienteService } from '../../shared/services/cliente.service';
import {
  ListColumn,
  Pagination,
} from '../../shared/interfaces/list-component.interface';
import { ClienteFiltros } from '../../shared/interfaces/cliente.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ListComponent, MatProgressSpinnerModule],
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
  ];

  pageSizes = [];

  filter: ClienteFiltros = {};

  getClientes = (pagination: Pagination, filter: any) =>
    this.service?.getClientes(pagination, filter);

  constructor(
    private headerService: HeaderService,
    private service: ClienteService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Clientes');
  }
}
