export interface IUsuarioLogin {
    username: string;
    senha: string;
}

export interface IContaCadastro {
    id?: number;
    numero: string
    banco: string
    agencia: string
    tipoConta: string
    saldo: number
}

export interface IUsuarioCadastro {
    username: string;
    nome: string;
    senha: string;
}


export interface IMovimentacaoCadastro {
    id?: number;
    conta: undefined;
    valor: number;
    dataMovimentacao: string;
    categoria: string;
    descricao: string;
    situacaoMovimentacao: string;
    tipoMovimentacao: string;
}