export interface IUserLogin {
    username: string;
    senha: string;
}

export interface IUserSignup {
    nome: string;
    username: string;
    senha: string;
}

export interface ICategory {
    id?: number;
    name: string;
}

export interface IProduct {
    id?: number;
    name: string;
    description: string;
    price: number;
    category: ICategory;
}