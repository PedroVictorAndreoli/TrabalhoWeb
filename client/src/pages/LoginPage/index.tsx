import { IUsuarioLogin } from "@/commons/interfaces";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from "@/components/Input";
import AuthService from "@/services/AuthService";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as crypto from 'crypto';


export function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    senha: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    senha: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState("");
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

  const onClickLogin = () => {
    setPendingApiCall(true);
    const userLogin: IUsuarioLogin = {
      username: form.username,
      senha: form.senha,
    };

    console.log(AuthService.publicKey())
    AuthService.login(userLogin)
      .then((response) => {
        setUserAuthenticated(response.data.token);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setApiError("");
        setPendingApiCall(false);
        // direcionar o usuário para a página inicial
        navigate("/");
      })
      .catch((responseError) => {
        if (responseError.response.data) {
          setApiError(responseError.response.data.message);
          setUserAuthenticated("");
        }
      })
      .finally(() => {
        setPendingApiCall(false);
      });
  };

  return (
    <div id="mainlogin">

      <main className="container">

        <form id="formLogin">
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal mt-3">Login</h1>
          </div>

          <div className="form-floating mb-3">
            <Input
              label="Informe seu usuário"
              name="username"
              className="form-control"
              type="text"
              placeholder="Informe seu usuário"
              value={form.username}
              onChange={onChange}
              hasError={false}
              error=""
            />




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
              placeholder="Iforme sua senha"
              onChange={onChange}
            />
            {errors.senha && (
              <div className="invalid-feedback">{errors.senha}</div>
            )}
          </div>

          <ButtonWithProgress
            disabled={pendingApiCall}
            className="w-75 btn btn-lg btn-warning mb-3"
            onClick={onClickLogin}
            pendingApiCall={pendingApiCall}
            text="Entrar"
          />

          {userAuthenticated && (
            <div className="col-12 mb-3">
              <div className="alert alert-success">{userAuthenticated}</div>
            </div>
          )}
          {apiError && (
            <div className="col-12 mb-3">
              <div className="alert alert-danger">{apiError}
              </div>
            </div>
          )}
          <div className="text-center mb-3 mx-3">
            <span>Não possui cadastro?Cadastre-se </span>
            <Link to="/cadastro"> aqui</Link>
          </div>
        </form>

      </main>
    </div>
  );
}