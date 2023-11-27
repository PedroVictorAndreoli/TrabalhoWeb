import AuthService from "@/services/AuthService";
import { Navigate, Outlet } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import { MenuLateral } from "@/components/MenuLateral/MenuLateral";


export function AuthenticatedRoutes() {
  const isAuthenticated = AuthService.isAuthenticated();

  return isAuthenticated ? (
    <>
      <ProSidebarProvider>
        <MenuLateral/>
        <Outlet />
      </ProSidebarProvider>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}