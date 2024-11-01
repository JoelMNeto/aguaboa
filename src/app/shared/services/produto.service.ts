import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ClienteFiltros } from '../interfaces/cliente.interface';
import { Pagination } from '../interfaces/list-component.interface';
import { ProdutoInformacoes } from '../interfaces/produto.interface';

const endpoint = 'api/produtos';

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
}
