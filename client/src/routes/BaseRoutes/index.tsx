import { Home } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { CadastroUserPage } from "@/pages/CadastroUserPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { CadastroContaPage } from "@/pages/CadastroContaPage"
import { ContaListPage } from "@/pages/ContaListPage";
import { MovimentacaoListPage } from "@/pages/MovimentacaoListPage";
import { CadastroMovimentacaoPage } from "@/pages/CadastroMovimentacaoPage";
import { DashboardPage } from "@/pages/DashboardPage";
import RSAKeyGeneratornpm from "@/services/RSAService";
export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroUserPage />} />
        <Route path="/teste" element={<RSAKeyGeneratornpm />} />

        {/* Protected Routes */}
        <Route element={<AuthenticatedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/cadastroConta/" element={<CadastroContaPage />} />
          <Route path="/cadastroConta/new" element={<CadastroContaPage />} />
          <Route path="/cadastroConta/:id" element={<CadastroContaPage />} />
          <Route path="/contas" element={<ContaListPage />} />
          <Route path="/cadastroMovimentacao" element={<CadastroMovimentacaoPage />} />
          <Route path="/cadastroMovimentacao/new" element={<CadastroMovimentacaoPage />} />
          <Route path="/cadastroMovimentacao/:id" element={<CadastroMovimentacaoPage />} />
          <Route path="/movimentacoes" element={<MovimentacaoListPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* <Route path="/categories" element={<CategoryListPage />} />
                <Route path="/categories/new" element={<CategoryFormPage />} />
                <Route path="/categories/:id" element={<CategoryFormPage />} />

                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/new" element={<ProductFormPage />} />
                <Route path="/products/:id" element={<ProductFormPage />} />

                <Route path="/products-v2" element={<ProductListPageV2 />} />

                <Route path="/products-v2/new" element={<ProductFormPageV2 />} />
                <Route path="/products-v2/:id" element={<ProductFormPageV2 />} />*/}
        </Route>
      </Routes>
    </>
  )
}