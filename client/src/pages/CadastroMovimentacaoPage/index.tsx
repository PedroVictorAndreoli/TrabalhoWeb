import { IContaCadastro, IMovimentacaoCadastro } from "@/commons/interfaces";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from '@/components/Input'

import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from "react";
import MovimentacaoService from "@/services/MovimentacaoService";
import ContaService from "@/services/ContaService";


export function CadastroMovimentacaoPage() {
    const [form, setForm] = useState({
        id: undefined,
        conta: { id: undefined, numero: "", banco: "", saldo: 0, agencia: "", tipoConta: "" },
        valor: 0,
        dataMovimentacao: "",
        categoria: "",
        descricao: "",
        situacaoMovimentacao: "",
        tipoMovimentacao: ""
    });
    const [errors, setErrors] = useState({
        id: undefined,
        conta: { id: undefined, numero: "", banco: "", valor: 0 },
        valor: 0,
        dataMovimentacao: undefined,
        categoria: "",
        descricao: "",
        situacaoMovimentacao: "",
        tipoMovimentacao: ""
    });

    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const [contas, setContas] = useState<IContaCadastro[]>([]);
    const { id } = useParams();


    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (id) {
            ContaService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setForm({
                            id: response.data.id,
                            conta: { id: response.data.conta.id, numero: "", banco: "", saldo: 0, agencia: "", tipoConta: "" },
                            valor: response.data.valor,
                            dataMovimentacao: response.data.dataMovimentacao,
                            categoria: response.data.categoria,
                            descricao: response.data.descricao,
                            situacaoMovimentacao: response.data.situacaoMovimentacao,
                            tipoMovimentacao: response.data.tipoMovimentacao
                        });


                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, []);

    const loadData = async () => {
        // Busca a lista de categorias
        await ContaService.findAll()
            .then((response) => {
                // caso sucesso, adiciona a lista no state
                setContas(response.data);
                console.log(response.data)
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a combo de categorias.");
            });





        /*const currencies = [
            {
                value: 'ContaCorrente',
                label: 'Conta Corrente',
            },
            {
                value: 'ContaPoupanca',
                label: 'Conta Poupança',
            },
            {
                value: 'ContaInvestimento',
                label: 'Conta Investimento',
            },
        ];*/
    }

    const onSubmit = () => {
        console.log({ apiError })
        const category: IMovimentacaoCadastro = {
            id: form.id,
            conta: form.conta,
            valor: form.valor,
            dataMovimentacao: form.dataMovimentacao,
            categoria: form.categoria,
            descricao: form.descricao,
            situacaoMovimentacao: form.situacaoMovimentacao,
            tipoMovimentacao: form.tipoMovimentacao
        };
        setPendingApiCall(true);
        MovimentacaoService.save(category)
            .then((response) => {
                console.log(response);
                setPendingApiCall(false);
                navigate("/movimentacoes");
            })
            .catch((responseError) => {
                if (responseError.response.data.validationErrors) {
                    setErrors(responseError.response.data.validationErrors);
                }
                setPendingApiCall(false);
                setApiError("");
            });
    };
    const handleChange = (event: SelectChangeEvent<typeof form.conta>) => {
        const { name, value } = event.target;
        setForm((previousState) => ({
            ...previousState,
            [name]: value,
        }));

        setErrors((previousState) => ({
            ...previousState,
            [name]: undefined,
        }));
    };

    return (
        <div>
            <main className="container">
                <form id="formCadastros" className="mt-2">
                    <h2 className="text-center">Cadastro de Contas</h2>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            {/* <Grid xs={4}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                <Input
                                    label="Informe sua banco"
                                    name="banco"
                                    className="form-control w-100"
                                    type="text"
                                    placeholder="Informe sua conta"
                                    value={form.banco}
                                    onChange={onChange}
                                    hasError={false}
                                    error="" />
                                {errors.banco && (
                                    <div className="invalid-feedback">{errors.banco}</div>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid xs={4}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                <Input
                                    label="Informe seu numero"
                                    name="numero"
                                    className="form-control w-100"
                                    type="text"
                                    placeholder="Informe seu numero"
                                    value={form.numero}
                                    onChange={onChange}
                                    hasError={false}
                                    error="" />
                                {errors.numero && (
                                    <div className="invalid-feedback">{errors.numero}</div>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid xs={4}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                <Input
                                    label="Informe sua agencia"
                                    name="agencia"
                                    className="form-control w-100"
                                    type="text"
                                    placeholder="Informe sua agencia"
                                    value={form.agencia}
                                    onChange={onChange}
                                    hasError={false}
                                    error="" />
                                {errors.agencia && (
                                    <div className="invalid-feedback">{errors.agencia}</div>
                                )}
                            </FormControl>
                                </Grid>*/}
                            <Grid xs={12}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <InputLabel id="demo-controlled-open-select-label">Tipo de Conta</InputLabel>
                                    <Select
                                        id="outlined-select-currency"
                                        name="tipoMovimentacao"
                                        label="Tipo de Conta"
                                        value={form.conta.id}
                                        onChange={handleChange}
                                    >
                                        {contas.map((option: IContaCadastro) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                Numero: {option.numero} Banco: {option.banco}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/*<Grid xs={6}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                <Input
                                    label="Informe seu banco"
                                    name="saldo"
                                    className="form-control w-100"
                                    type="number"
                                    placeholder="Informe seu banco"
                                    value={form.saldo.toString()}
                                    onChange={onChange}
                                    hasError={false}
                                    error="" />
                            </FormControl>
                                    </Grid>*/}
                            <Grid xs={12}>
                                <ButtonWithProgress
                                    disabled={pendingApiCall}
                                    className="w-100 btn btn-lg btn-warning mb-3 mt-3"
                                    onClick={onSubmit}
                                    //disabled={pendingApiCall ? true : false}
                                    pendingApiCall={pendingApiCall}
                                    text="Cadastrar"
                                />
                            </Grid>

                            {apiError && (

                                <div className="alert alert-danger">
                                    Falha ao cadastrar a categoria.
                                </div>
                            )}
                        </Grid>
                    </Box>


                </form>

            </main>
        </div>
    );
}