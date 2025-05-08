import { Routes } from '@angular/router';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { PedidoComponent } from './pages/pedido/pedido.component';

export const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/cliente/create-cliente/create-cliente.component').then(m => m.CreateClienteComponent),
  },
  {
    path: 'produto',
    loadComponent: () => import('./pages/produto/produto.component').then(m => m.ProdutoComponent),
  },
  {
    path: 'create-produto',
    loadComponent: () => import('./pages/produto/create-produto/create-produto.component').then(m => m.CreateProdutoComponent),
  },
  {
    path: 'pedido',
    loadComponent: () => import('./pages/pedido/pedido.component').then(m => m.PedidoComponent),
  },
];
