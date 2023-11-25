import { Edit, SimpleForm, TextInput, required } from 'react-admin';

export function LoginPage() {
  return (
<<<<<<< HEAD
  <>
  <p>AAAAA</p>
  <Edit>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="teaser" validate={[required()]} defaultValue="Lorem Ipsum" multiline fullWidth />
        </SimpleForm>
    </Edit>
  </>);
}
=======
    <>
      <main className="container">
        
        <form >
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal">Login</h1>
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
              name="password"
              className={
                errors.password ? "form-control is-invalid" : "form-control"
              }
              error=""
              type="password"
              placeholder="Informe sua senha"
              onChange={onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <ButtonWithProgress
            disabled={pendingApiCall}
            className="w-100 btn btn-lg btn-primary mb-3"
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
              <div className="alert alert-danger">{apiError}</div>
            </div>
          )}
          <div className="text-center">
          <span>Não possui cadastro </span>
          <Link to="/signup">Cadastre-se aqui</Link>
        </div>
        </form>
        
      </main>
    </>
  );
}
>>>>>>> parent of 493c7f8 (Arrumei)
