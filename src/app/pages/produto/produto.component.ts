import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import {
  ListColumn,
  Pagination,
} from '../../shared/interfaces/list-component.interface';
import { ProdutoService } from '../../shared/services/produto.service';
import {
  ProdutoFiltros,
  ProdutoInformacoes,
} from '../../shared/interfaces/produto.interface';
import { ListComponent } from '../../shared/components/list/list.component';
import { UtilsService } from '../../shared/services/utils.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss',
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
    {
      label: '',
      value: 'actionDelete',
      color: 'accent',
      tooltipMessage: 'Excluir produto',
      isAction: true,
      icon: 'delete',
      action: (row: ProdutoInformacoes) => this.desativaProduto(row),
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
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.headerService.setPageTitle('Produtos');
  }

  private desativaProduto(produto: ProdutoInformacoes): void {
    this.dialog
      .open(DialogComponent, {
        data: {
          title: 'Desativar produto',
          message: `Tem certeza que deseja desativar o produto: ${produto.id} - ${produto.nome}?`,
          askConfirmation: true,
        },
      })
      .afterClosed()
      .pipe(filter((answer) => answer === true))
      .subscribe(() => {
        this.service.desativaProduto(produto.id).subscribe(() => {
          this.snackbar.open('Produto desativado com sucesso!', 'Ok');
        });
      });
  }
}
