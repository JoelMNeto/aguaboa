import { Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { PedidoComponent } from './pages/pedido/pedido.component';

export const routes: Routes = [
  {
    path: '',
    component: ClienteComponent
  },
  {
    path: 'produto',
    component: ProdutoComponent
  },
  {
    path: 'pedido',
    component: PedidoComponent
  },
];
