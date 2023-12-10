import { IContaCadastro } from "@/commons/interfaces"
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from '@/components/Input'

import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import ContaService from "@/services/ContaService";
import { useEffect } from "react";


export function CadastroContaPage() {
  const [form, setForm] = useState({
    id: undefined,
    numero: "",
    banco: "",
    agencia: "",
    tipoConta: "",
    saldo: 0
  });
  const [errors, setErrors] = useState({
    id: undefined,
    numero: "",
    banco: "",
    agencia: "",
    tipoConta: "",
    saldo: 0
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      ContaService.findById(parseInt(id))
        .then((response) => {
          if (response.data) {
            setForm({
              id: response.data.id,
              numero: response.data.numero,
              banco: response.data.banco,
              agencia: response.data.agencia,
              tipoConta: response.data.tipoConta,
              saldo: response.data.saldo
            });

            console.log(response.data.id)
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, []);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        [name]: "",
      };
    });
  };
  const onSubmit = () => {
    console.log({ apiError })
    const category: IContaCadastro = {
      id: form.id,
      numero: form.numero,
      banco: form.banco,
      agencia: form.agencia,
      tipoConta: form.tipoConta,
      saldo: form.saldo
    };
    setPendingApiCall(true);
    ContaService.save(category)
      .then((response) => {
        console.log(response);
        setPendingApiCall(false);
        navigate("/contas");
      })
      .catch((responseError) => {
        if (responseError.response.data.validationErrors) {
          setErrors(responseError.response.data.validationErrors);
        }
        setPendingApiCall(false);
        setApiError(true);
      });
  };
  const handleChange = (event: SelectChangeEvent<typeof form.tipoConta>) => {
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

  const currencies = [
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
  ];


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
                    label="Informe seu banco"
                    name="banco"
                    className="form-control w-100"
                    placeholder=""
                    type="text"
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
              </Grid>
              <Grid xs={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <InputLabel id="demo-controlled-open-select-label">Tipo de Conta</InputLabel>
                  <Select
                    id="outlined-select-currency"
                    name="tipoConta"
                    label="Tipo de Conta"
                    onChange={handleChange}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={6}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <Input
                    label="Informe seu saldo"
                    name="saldo"
                    className="form-control w-100"
                    type="number"
                    placeholder="Informe seu saldo"
                    value={form.saldo.toString()}
                    onChange={onChange}
                    hasError={false}
                    error="" />
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