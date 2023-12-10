import { IContaCadastro } from "@/commons/interfaces";
import { useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { FormControl } from "@mui/material";
import { useEffect } from "react";
import MovimentacaoService from "@/services/MovimentacaoService";
import ContaService from "@/services/ContaService";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { MainCard } from "@/components/MainCard/MainCard";
export function DashboardPage() {
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