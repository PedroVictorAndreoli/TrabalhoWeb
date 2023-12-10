import { IMovimentacaoCadastro } from "@/commons/interfaces";
import { api } from "@/lib/axios";


const findAll = () => {
    return api.get('/movimentacoes');
}

const findSaldoFuturo = () => {
    return api.get('movimentacoes/saldoFuturo');
}

const findOneMaiorCategoria = () => {
    return api.get('/movimentacoes/maiorvalor');
}


const save = (category: IMovimentacaoCadastro) => {
    return api.post('/movimentacoes', category);
}

const update = (category: IMovimentacaoCadastro) => {
    return api.post(`/movimentacoes/${category.id}`, category);
}

const findById = (id: number) => {
    return api.get(`/movimentacoes/${id}`);
}

const remove = (id: number) => {
    return api.delete(`/movimentacoes/${id}`);
}

const ContaService = {
    findAll,
    save,
    findById,
    remove,
    findSaldoFuturo,
    findOneMaiorCategoria,
    update
}

export default ContaService;