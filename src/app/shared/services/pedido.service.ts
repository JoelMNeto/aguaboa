import { Injectable } from '@angular/core';
import { ClienteFiltros } from '../interfaces/cliente.interface';
import { Pagination } from '../interfaces/list-component.interface';
import { HttpService } from './http.service';
import { PedidoInformacoes, PedidoLancamento } from '../interfaces/pedido.interface';

const endpoint = 'api/pedidos';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private http: HttpService) {}

  getPedidos(pagination: Pagination, filter: ClienteFiltros) {
    return this.http.get<PedidoInformacoes>({
      endpoint,
      params: {
        ...pagination,
        ...filter,
      },
    });
  }

  lancaPedido(body: PedidoLancamento) {
    return this.http.post<PedidoInformacoes>({
      endpoint,
      body,
    });
  }

  desativaPedido(pedidoId: number) {
    return this.http.delete({
      endpoint: `${endpoint}/${pedidoId}`,
    });
  }
}
