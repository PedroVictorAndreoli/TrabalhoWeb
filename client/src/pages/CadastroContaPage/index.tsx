import { IContaCadastro } from "@/commons/interfaces"
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from '@/components/Input'
import AuthService from "@/services/AuthService";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import theme from "@/theme";
import { FormControl, InputLabel, Select, SelectChangeEvent, TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';


export function CadastroContaPage() {
  const [form, setForm] = useState({
    numero: "",
    conta: "",
    agencia: "",
    tipoConta: "",
    saldo: 0
  });
  const [errors, setErrors] = useState({
    numero: "",
    conta: "",
    agencia: "",
    tipoConta: "",
    saldo: 0
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [userSaved, setUserSaved] = useState("");
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((previousState) => {
      return {
        ...previousState,
        [name]: value,
      };
    });

    setErrors((previousState) => {
      return {
        ...previousState,
        [name]: undefined,
      };
    });
  };

  const handleChange = (event: SelectChangeEvent<typeof form.tipoConta>) => {
    const { name, value } = event.target;
    setForm((previousState) => {
      return {
        ...previousState,
        [name]: value,
      };
    });

    setErrors((previousState) => {
      return {
        ...previousState,
        [name]: undefined,
      };
    });
  };

  const onClickCadastrar = () => {
    setPendingApiCall(true);
    const contaCadastro: IContaCadastro = {
      numero: form.numero,
      conta: form.conta,
      agencia: form.agencia,
      tipoConta: form.tipoConta,
      saldo: form.saldo
    };
    AuthService.cadastroConta(contaCadastro)
      .then((response) => {
        setUserSaved(response.data.message);
        setApiError("");
        navigate("/cadastroConta");
      })
      .catch((responseError) => {
        if (responseError.response.data.validationErrors) {
          setErrors(responseError.response.data.validationErrors);

          setApiError(responseError.response.data.message);
          setUserSaved("");
        }
      })
      .finally(() => {
        setPendingApiCall(false);
      });
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
                    label="Informe sua conta"
                    name="conta"
                    className="form-control w-100"
                    type="text"
                    placeholder="Informe sua conta"
                    value={form.conta}
                    onChange={onChange}
                    hasError={false}
                    error="" />
                  {errors.conta && (
                    <div className="invalid-feedback">{errors.conta}</div>
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
                  {errors.conta && (
                    <div className="invalid-feedback">{errors.conta}</div>
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
                  {errors.conta && (
                    <div className="invalid-feedback">{errors.agencia}</div>
                  )}
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <InputLabel id="demo-controlled-open-select-label">Tipo de Conta</InputLabel>
                  <Select
                    id="outlined-select-currency"
                    name="Tipo de Conta"
                    label="Tipo de Conta"
                    defaultValue="ContaCorrente"
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
                    label="Informe seu banco"
                    name="saldo"
                    className="form-control w-100"
                    type="number"
                    placeholder="Informe seu banco"
                    value={form.saldo.toString()}
                    onChange={onChange}
                    hasError={false}
                    error="" />
                  {errors.conta && (
                    <div className="invalid-feedback">{errors.conta}</div>
                  )}
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <ButtonWithProgress
                  disabled={pendingApiCall}
                  className="w-100 btn btn-lg btn-warning mb-3 mt-3"
                  onClick={onClickCadastrar}
                  pendingApiCall={pendingApiCall}
                  text="Cadastrar"
                />
              </Grid>
              {userSaved && (
                <div className="col-12 mb-3">
                  <div className="alert alert-success">{userSaved}</div>
                </div>
              )}
              {apiError && (
                <div className="col-12 mb-3">
                  <div className="alert alert-danger">{apiError}</div>
                </div>
              )}
            </Grid>
          </Box>
          {/*<div className="form-floating mb-3">
            <Input
              label="Informe seu usuário"
              name="username"
              className="form-control"
              type="text"
              placeholder="Informe seu usuário"
              value={form.username}
              onChange={onChange}
              hasError={false}
              error=""/>
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <Input
              name="senha"
              className={
                errors.senha ? "form-control is-invalid" : "form-control"
              }
              error=""
              type="password"
              label=""
              value={form.senha}
              hasError={true}
              placeholder="Informe sua senha"
              onChange={onChange}
            />
            {errors.senha && (
              <div className="invalid-feedback">{errors.senha}</div>
            )}
          </div>
          <div className="text-center mx-3">
          <span>Já possui cadastro? </span>
          <Link to="/login">Autenticar-se</Link>
          </div>
          <ButtonWithProgress
            disabled={pendingApiCall}
            className="w-50 btn btn-lg btn-warning mb-3 mt-3"
            onClick={onClickSignup}
            pendingApiCall={pendingApiCall}
            text="Cadastrar"
          />

          {userSaved && (
            <div className="col-12 mb-3">
              <div className="alert alert-success">{userSaved}</div>
            </div>
          )}
          {apiError && (
            <div className="col-12 mb-3">
              <div className="alert alert-danger">{apiError}</div>
            </div>
          )}
          */}

        </form>

      </main>
    </div>
  );
}