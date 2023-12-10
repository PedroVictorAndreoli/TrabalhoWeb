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
import { MainCard } from "@/components/MainCard/MainCard";
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
    const [dataMovimentacao, setDataMovimentacao] = useState([]);
    const [dataSaldoFuturo, setDataSaldoFuturo] = useState([]);
    const [somaSaldo, setSomaSaldo] = useState<number>(0);
    const [maiorGasto, setMaiorGasto] = useState<number>(0);
    const [categoria, setCategoriaGasto] = useState<string>('');
    const [saldoFuturo, setSaldoFuturo] = useState<number>(0);

    useEffect(() => {
        loadData();
        loadDataValor();
        loadSaldoFuturo();
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

    const loadDataValor = () => {
        MovimentacaoService.findOneMaiorCategoria()
            .then((response) => {
                setDataMovimentacao(response.data);
                const maiorGasto = response.data.valor;
                setMaiorGasto(maiorGasto);
                const categoria = response.data.categoria;
                setCategoriaGasto(categoria);
            }).catch((error) => {
                console.log(error);
            });
    }

    const loadSaldoFuturo = () => {
        MovimentacaoService.findSaldoFuturo()
            .then((response) => {
                setDataSaldoFuturo(response.data);
                const saldoFuturo = response.data;
                setSaldoFuturo(saldoFuturo);
            })
    }

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    Maior Gasto
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
                            R$ {maiorGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Typography>
                    </Box>
                </Grid>
                <Grid container spacing={0}>
                    <p>Maior gasto {categoria}</p>
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
                            <Grid xs={4}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <Box sx={{ maxWidth: 275 }}>
                                        <Card variant="outlined"><MainCard
                                            label='Maior Gasto' numero={maiorGasto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} descricao="Maior gasto: " descricaoComplemento={categoria}
                                        ></MainCard></Card>
                                    </Box>
                                </FormControl>
                            </Grid>
                            <Grid xs={4}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <Box sx={{ maxWidth: 275 }}>
                                        <Card variant="outlined"><MainCard
                                            label='Saldo Total' numero={somaSaldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} descricao=" " descricaoComplemento=""
                                        ></MainCard></Card>
                                    </Box>
                                </FormControl>
                            </Grid>
                            <Grid xs={4}>
                                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                    <Box sx={{ maxWidth: 275 }}>
                                        <Card variant="outlined"><MainCard
                                            label='Saldo Futuro' numero={saldoFuturo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} descricao=" " descricaoComplemento=""
                                        ></MainCard></Card>
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