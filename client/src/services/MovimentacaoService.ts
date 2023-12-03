import { IMovimentacaoCadastro } from "@/commons/interfaces";
import { api } from "@/lib/axios";


const findAll = () => {
    return api.get('/movimentacoes');
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
    update
}

export default ContaService;