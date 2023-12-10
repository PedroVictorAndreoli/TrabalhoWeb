import { IContaCadastro, IMovimentacaoCadastro } from "@/commons/interfaces";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from '@/components/Input'
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import { FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from "react";
import MovimentacaoService from "@/services/MovimentacaoService";
import ContaService from "@/services/ContaService";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import Icon from "@mui/material";
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
export function DashboardPage() {
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
    const [data, setData] = useState([]);
    const [somaSaldo, setSomaSaldo] = useState<number>(0);

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

    const loadData = () => {
        ContaService.findAll()
            .then((response) => {
                setData(response.data);
                // Calcula a soma dos saldos quando os dados são carregados
                const saldoTotal = response.data.reduce((total: number, conta: IContaCadastro) => total + conta.saldo, 0);
                setSomaSaldo(saldoTotal);
            })
            .catch((error) => {
                console.log(error);
            });
    };


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


    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    Saldo Total
                </Typography>
                <Grid container spacing={0}>
                    < PriceChangeIcon sx={{ fontSize: 60 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" component="div" sx={{ ml: 1.5 }}>
                            R$ {somaSaldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Typography>
                    </Box>
                </Grid>

            </CardContent>
        </React.Fragment >
    );
    return (
        <div>
            <main className="container">
                <form id="formCadastros" className="mt-2">
                    <h2 className="text-center">Dashboard</h2>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1}>
                            <Grid xs={2}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <Box sx={{ maxWidth: 275 }}>
                                        <Card variant="outlined">{card}</Card>
                                    </Box>
                                </FormControl>
                            </Grid>
                            <Grid xs={2}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <Box sx={{ maxWidth: 275 }}>
                                        <Card variant="outlined">{card}</Card>
                                    </Box>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>


                </form>

            </main>
        </div >
    );
}