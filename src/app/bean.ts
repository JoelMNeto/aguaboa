export interface MenuStructBean {
  path: string;
  title: string;
  menuName: string;
  icone: string;
}

export const menu = [
  {
    path: '',
    title: 'Clientes',
    menuName: 'Clientes',
    icone: 'person',
  },
  {
    path: '/produto',
    title: 'Produtos',
    menuName: 'Produtos',
    icone: 'store',
  },
  {
    path: '/pedido',
    title: 'Pedidos',
    menuName: 'Pedidos',
    icone: 'shopping_cart',
  },
];
