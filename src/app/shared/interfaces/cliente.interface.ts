export interface ClienteFiltros {
  busca?: string;
  nome?: string;
  bairro?: string;
  logradouro?: string;
}

export interface ClienteInformacoes {
  id: number;
  nome?: string;
  contato?: string;
  endereco?: EnderecoBean;
  saldoEmConta?: number;
}

export interface ClienteCadastro {
  nome?: string;
  contato?: string;
  endereco?: EnderecoBean;
}

export interface EnderecoBean {
  logradouro?: string;
  numero?: number;
  bairro?: string;
  complemento?: string;
  cep?: string;
  cidade?: string;
}