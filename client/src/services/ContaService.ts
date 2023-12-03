import { IContaCadastro } from "@/commons/interfaces";
import { api } from "@/lib/axios";


const findAll = () => {
    return api.get('/contas');
}

const save = (category: IContaCadastro) => {
    return api.post('/contas', category);
}

const update = (category: IContaCadastro) => {
    return api.post(`/contas/${category.id}`, category);
}

const findById = (id: number) => {
    return api.get(`/contas/${id}`);
}

const remove = (id: number) => {
    return api.delete(`/contas/${id}`);
}

const ContaService = {
    findAll,
    save,
    findById,
    remove,
    update
}

export default ContaService;