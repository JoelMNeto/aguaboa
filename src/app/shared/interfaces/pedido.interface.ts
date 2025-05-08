import { ClienteInformacoes } from './cliente.interface';
import { ProdutoInformacoes } from './produto.interface';

export interface PedidoInformacoes {
  id: number;
  valorTotal: number;
  frete: number;
  status: StatusEnum;
  tipo: TipoPedidoEnum;
  valorAtualizado: number;
  valorPago: number;
  formaPagamento: FormaPagamentoEnum;
  data: string;
  cliente: ClienteInformacoes;
  itens: PedidoInformacoes[];
}

export interface ItemPedidoInformacoes {
  id: number;
  produto: ProdutoInformacoes;
  quantidade: number;
  desconto: number;
  precoUnitario: number;
}

export interface PedidoFiltros {
  clienteId?: number,
  busca?: string, 
  status?: StatusEnum, 
  tipo?: TipoPedidoEnum, 
  formaPagamento?: FormaPagamentoEnum,
  peridoInicio?: Date, 
  periodoFim?: Date,
}

export interface PedidoLancamento {
  clienteId: number;
  itens: ItemPedidoCadastro[];
  frete?: number;
  tipo?: TipoPedidoEnum;
  formaPagamento?: FormaPagamentoEnum;
  valorPago?: number;
}

export interface ItemPedidoCadastro {
  produtoId: number;
  quantidade: number;
  desconto?: number;
  precoUnitario?: number;
}

export enum StatusEnum {
  PAGO = 'Pago' as any,
  EM_ABERTO = 'Em aberto' as any,
}

export enum TipoPedidoEnum {
  ENTREGA = 'ENTREGA' as any,
  RETIRADA = 'RETIRADA' as any,
}

export enum FormaPagamentoEnum {
  CARTAO = 'CARTÃO' as any,
  DINHEIRO = 'DIENHEIRO' as any,
  SALDO = 'SALDO EM CONTA' as any,
  PIX = 'PIX' as any,
}