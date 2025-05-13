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
  clienteId?: number;
  busca?: string;
  status?: StatusEnum;
  tipo?: TipoPedidoEnum;
  formaPagamento?: FormaPagamentoEnum;
  peridoInicio?: Date;
  periodoFim?: Date;
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

export interface PedidoAlteracao {
  id: number;
  valorPago: number;
}

export enum StatusEnum {
  PAGO = "PAGO",
  EM_ABERTO = "EM_ABERTO",
}

export enum TipoPedidoEnum {
  ENTREGA = "ENTREGA",
  RETIRADA = "RETIRADA",
}

export enum FormaPagamentoEnum {
  CARTAO = "CARTAO",
  DINHEIRO = "DINHEIRO",
  SALDO = "SALDO",
  PIX = "PIX",
}

export const FORMAS_PAGAMENTO = [
  {
    viewValue: 'Dinheiro',
    value: FormaPagamentoEnum.DINHEIRO,
  },
  {
    viewValue: 'Pix',
    value: FormaPagamentoEnum.PIX,
  },
  {
    viewValue: 'Cartão',
    value: FormaPagamentoEnum.CARTAO,
  },
  {
    viewValue: 'Saldo em conta',
    value: FormaPagamentoEnum.SALDO,
  },
];

export const TIPOS_PEDIDO = [
  {
    viewValue: 'Entrega',
    value: TipoPedidoEnum.ENTREGA,
  },
  {
    viewValue: 'Retirada',
    value: TipoPedidoEnum.RETIRADA,
  },
];

export const STATUS_PEDIDO = [
  {
    viewValue: 'EM ABERTO',
    value: StatusEnum.EM_ABERTO,
  },
  {
    viewValue: 'PAGO',
    value: StatusEnum.PAGO,
  },
];