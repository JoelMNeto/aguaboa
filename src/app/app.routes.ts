import { Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { CreateClienteComponent } from './pages/cliente/create-cliente/create-cliente.component';

export const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
  },
  {
    path: 'create',
    component: CreateClienteComponent,
  },
  {
    path: 'produto',
    component: ProdutoComponent,
    // children: [
    //   {
    //     path: '/novo',
    //     component: 
    //   }
    // ]
  },
  {
    path: 'pedido',
    component: PedidoComponent
  },
];
