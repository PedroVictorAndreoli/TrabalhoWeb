import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";

export function BaseRoutes() {
  return (
    <>
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/signup" element={<UserSignupPage />} />*/}

            {/* Protected Routes */}
            <Route element={<AuthenticatedRoutes />}>
                <Route path="/" element={<HomePage />} />

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