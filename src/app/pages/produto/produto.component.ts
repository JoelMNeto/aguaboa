import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { ListColumn, Pagination } from '../../shared/interfaces/list-component.interface';
import { ProdutoService } from '../../shared/services/produto.service';
import { ProdutoFiltros } from '../../shared/interfaces/produto.interface';
import { ListComponent } from '../../shared/components/list/list.component';
import { UtilsService } from '../../shared/services/utils.service';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent implements OnInit {
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
      label: 'Marca',
      value: 'marca',
    },
    {
      label: 'Preço',
      value: 'preco',
      format: this.utilsService.formataValorMonetario,
    },
  ];

  pageSizes = [];

  filter: ProdutoFiltros = {};

  getProdutos = (pagination: Pagination, filter: any) =>
    this.service?.getProdutos(pagination, filter);

  constructor(
    private headerService: HeaderService,
    private service: ProdutoService,
    private utilsService: UtilsService,
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Produtos');
  }
}
