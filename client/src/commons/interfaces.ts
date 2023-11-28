export interface IUsuarioLogin {
    username: string;
    senha: string;
}

export interface IContaCadastro{
    numero:string
    conta:string
    agencia:string
    tipoConta:string
    saldo: number
}

export interface IUsuarioCadastro{
    username: string;
    nome: string;
    senha: string;
}