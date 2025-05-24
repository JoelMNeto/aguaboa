import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ClienteFiltros } from '../interfaces/cliente.interface';
import { Pagination } from '../interfaces/list-component.interface';
import { ProdutoCadastro, ProdutoInformacoes } from '../interfaces/produto.interface';

const endpoint = '/produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpService) {}

  getProdutos(pagination: Pagination, filter: ClienteFiltros) {
    return this.http.get<ProdutoInformacoes>({
      endpoint,
      params: {
        ...pagination,
        ...filter,
      },
    });
  }

  cadastraProduto(body: ProdutoCadastro) {
    return this.http.post<ProdutoInformacoes>({
      endpoint,
      body,
    });
  }

  desativaProduto(produtoId: number) {
    return this.http.delete({
      endpoint: `${endpoint}/${produtoId}`,
    });
  }
}
