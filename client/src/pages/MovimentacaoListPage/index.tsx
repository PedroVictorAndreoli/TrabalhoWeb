import { useEffect, useState } from "react";
import { IMovimentacaoCadastro } from "@/commons/interfaces";
import { Link } from "react-router-dom";
import MovimentacaoService from "@/services/MovimentacaoService";

export function MovimentacaoListPage() {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        MovimentacaoService.findAll()
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onClickRemove = (id?: number) => {
        if (id) {
            MovimentacaoService.remove(id)
                .then(() => {
                    loadData();
                    setApiError("");
                })
                .catch((responseError) => {
                    console.log(responseError);
                    setApiError(responseError.response.data.message);
                });
        }
    };

    return (
        <>
            <main className="container" id="formCadastros" >

                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">Lista de Contas</h1>
                </div>
                <div className="text-center">
                    <Link className="btn btn-success" to="/cadastroMovimentacao">
                        Nova Movimentacao
                    </Link>
                </div>
                {apiError && <div className="alert alert-danger">{apiError}</div>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Conta</td>
                            <td>Valor</td>
                            <td>Data de Movimentação</td>
                            <td>Categoria</td>
                            <td>Descricao</td>
                            <td>Situacao de Movimentacao</td>
                            <td>Tipo de Movimentacao</td>
                            <td>Editar</td>
                            <td>Remover</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((category: IMovimentacaoCadastro) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>Numero: {category.conta.numero} Banco: {category.conta.banco}</td>
                                <td>{category.valor}</td>
                                <td>{category.dataMovimentacao}</td>
                                <td>{category.categoria}</td>
                                <td>{category.descricao}</td>
                                <td>{category.situacaoMovimentacao}</td>
                                <td>{category.tipoMovimentacao}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary"
                                        to={`/cadastroMovimentacao/${category.id}`}>
                                        Editar
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onClickRemove(category.id)}>
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
}