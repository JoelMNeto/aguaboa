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

export enum StatusEnum {
  PAGO = 'Pago' as any,
  EM_ABERTO = 'Em aberto' as any,
}

export enum TipoPedidoEnum {
  ENTREGA = 'Entrega' as any,
  RETIRADA = 'Retirada' as any,
}

export enum FormaPagamentoEnum {
  CARTAO = 'Cartão' as any,
  DINHEIRO = 'Dienheiro' as any,
  SALDO = 'Saldo em conta' as any,
  PIX = 'PIX' as any,
}
