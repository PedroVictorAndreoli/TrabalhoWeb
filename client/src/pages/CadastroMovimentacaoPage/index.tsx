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
        conta: { id: undefined, numero: "", banco: "", saldo: 0, agencia: "", tipoConta: "" },
        valor: "",
        dataMovimentacao: undefined,
        categoria: "",
        descricao: "",
        situacaoMovimentacao: "",
        tipoMovimentacao: ""
    });

    const [pendingApiCall, setPendingApiCall] = useState(false);
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
    }


    const currencies = [
        {
            value: 'Pendente',
            label: 'Pendente',
        },
        {
            value: 'Pago',
            label: 'Pago',
        },
    ];

    const currencies1 = [
        {
            value: 'Receita',
            label: 'Receita',
        },
        {
            value: 'Despesa',
            label: 'Despesa',
        },
        {
            value: 'TransferenciaContasEntrada',
            label: 'Transferencia entre Contas (Entrada)',
        },
        {
            value: 'TransferenciaContasSaida',
            label: 'Transferencia entre Contas (Saida)',
        },
    ];

    const onChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
        setErrors((previousErrors) => {
            return {
                ...previousErrors,
                [name]: undefined,
            };
        });
    };

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
            [name]: { id: value },
        }));

        setErrors((previousState) => ({
            ...previousState,
            [name]: undefined,
        }));
    };

    const handleChangeTipoMovimentacao = (event: SelectChangeEvent<typeof form.tipoMovimentacao>) => {
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

    const handleChangeSituacao = (event: SelectChangeEvent<typeof form.situacaoMovimentacao>) => {
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
                            <Grid xs={4}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <Input
                                        label="Informe a categoria da Movimentação"
                                        name="categoria"
                                        className="form-control w-100"
                                        type="text"
                                        placeholder="Informe a categoria"
                                        value={form.categoria}
                                        onChange={onChange}
                                        hasError={false}
                                        error="" />
                                    {errors.categoria && (
                                        <div className="invalid-feedback">{errors.categoria}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid xs={4}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <Input
                                        label="Informe o valor"
                                        name="valor"
                                        className="form-control w-100"
                                        type="number"
                                        placeholder="Informe o valor"
                                        value={form.valor.toString()}
                                        onChange={onChange}
                                        hasError={false}
                                        error="" />
                                    {errors.valor && (
                                        <div className="invalid-feedback">{errors.valor}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid xs={4}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <Input
                                        label="Informe a descricao"
                                        name="descricao"
                                        className="form-control w-100"
                                        type="text"
                                        placeholder="Informe a descricao"
                                        value={form.descricao}
                                        onChange={onChange}
                                        hasError={false}
                                        error="" />
                                    {errors.descricao && (
                                        <div className="invalid-feedback">{errors.descricao}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid xs={12}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <InputLabel id="demo-controlled-open-select-label">Tipo de Conta</InputLabel>
                                    <Select
                                        id="outlined-select-currency"
                                        name="conta"
                                        label="Conta"
                                        value={form.conta.id}
                                        onChange={handleChange}>
                                        {contas.map((option: IContaCadastro) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                Numero: {option.numero} Banco: {option.banco}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={6}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    {/*<LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <DatePicker
                                            label={'Informe a data'}

                                            value={form.dataMovimentacao.toString()}
                                            views={['year', 'month', 'day']}
                                        />
                                    </LocalizationProvider>*/}
                                    <Input
                                        label="Informe a data"
                                        name="dataMovimentacao"
                                        className="form-control w-100"
                                        placeholder=""
                                        type="date"
                                        value={form.dataMovimentacao}
                                        onChange={onChange}
                                        hasError={false}
                                        error="" />
                                    {errors.descricao && (
                                        <div className="invalid-feedback">{errors.descricao}</div>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid xs={6}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <InputLabel id="demo-controlled-open-select-label">Situação</InputLabel>
                                    <Select
                                        id="outlined-select-currency"
                                        name="situacaoMovimentacao"
                                        label="Situação"
                                        onChange={handleChangeSituacao}>
                                        {currencies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <InputLabel id="demo-controlled-open-select-label">Tipo de Movimentação</InputLabel>
                                    <Select
                                        id="outlined-select-currency"
                                        name="tipoMovimentacao"
                                        onChange={handleChangeTipoMovimentacao}>
                                        {currencies1.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
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