import {IContaCadastro} from "@/commons/interfaces"
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from '@chakra-ui/react'
import AuthService from "@/services/AuthService";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function CadastroContaPage(){
    const [form, setForm] = useState({
        numero:"",
        conta:"",
        agencia:"",
        tipoConta:"",
        saldo:0
      });
      const [errors, setErrors] = useState({
        numero:"",
        conta:"",
        agencia:"",
        tipoConta:"",
        saldo:0
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

  const onClickCadastrar = () => {
    setPendingApiCall(true);
    const contaCadastro: IContaCadastro = {
        numero:form.numero,
        conta:form.conta,
        agencia:form.agencia,
        tipoConta:form.tipoConta,
        saldo:form.saldo
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

  return (
    <div>
      <main className="container">
        <form id="formCadastros" className="align-items-center">
          <h2 className="text-center mb-3">Cadastro de Contas</h2>
          
          <Input placeholder='Basic usage' id="metade" />
          <Input placeholder='Basic usage' id="metade" />

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