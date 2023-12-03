import { useEffect, useState } from "react";
import ContaService from "@/services/ContraService";
import { IContaCadastro } from "@/commons/interfaces";
import { Link } from "react-router-dom";

export function ContaListPage() {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        ContaService.findAll()
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onClickRemove = (id?: number) => {
        if (id) {
            ContaService.remove(id)
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
                    <Link className="btn btn-success" to="/cadastroConta">
                        Nova Conta
                    </Link>
                </div>
                {apiError && <div className="alert alert-danger">{apiError}</div>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Banco</td>
                            <td>Agencia</td>
                            <td>Numero</td>
                            <td>Saldo</td>
                            <td>Tipo Conta</td>
                            <td>Editar</td>
                            <td>Remover</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((category: IContaCadastro) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.banco}</td>
                                <td>{category.agencia}</td>
                                <td>{category.numero}</td>
                                <td>{category.saldo}</td>
                                <td>{category.tipoConta}</td>
                                <td>
                                    <Link
                                        className="btn btn-primary"
                                        to={`/cadastroConta/${category.id}`}
                                    >
                                        Editar
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onClickRemove(category.id)}
                                    >
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