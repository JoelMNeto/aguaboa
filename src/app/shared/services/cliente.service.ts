import { Injectable } from '@angular/core';
import { Pagination } from '../interfaces/list-component.interface';
import {
  ClienteCadastro,
  ClienteFiltros,
  ClienteInformacoes,
} from '../interfaces/cliente.interface';
import { HttpService } from './http.service';

const endpoint = 'api/clientes';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpService) {}

  getClientes(pagination: Pagination, filter: ClienteFiltros) {
    return this.http.get<ClienteInformacoes>({
      endpoint,
      params: {
        ...pagination,
        ...filter,
      },
    });
  }

  cadastraCliente(body: ClienteCadastro) {
    return this.http.post<ClienteInformacoes>({
      endpoint,
      body
    });
  }

  deletaCliente(clienteId: number) {
    return this.http.delete({
      endpoint: `${endpoint}/${clienteId}`,
    });
  }
}
