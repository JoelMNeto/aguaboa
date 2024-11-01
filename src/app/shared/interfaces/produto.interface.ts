export interface ProdutoInformacoes {
  id: number;
  nome: string;
  marca: string;
  preco: number;
}

export interface ProdutoFiltros {
  nome?: string,
  marca?: string,
  busca?: string,
}