import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AddCard from "@mui/icons-material/AddCard";
import "./MenuLateral.css"
import { Link, Route, Routes } from "react-router-dom";
import { Home } from "@/pages/HomePage";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import AuthService from "@/services/AuthService";


export function MenuLateral() {

  function logoutUser(): void {
    AuthService.logout()
  }

  return (

    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar className="app">
        <Menu>
          <MenuItem
            component={<Link to="/" className="link" />}
            className="menu1"
            icon={<MenuRoundedIcon />}
          >
            <h2>QUICKPAY</h2>
          </MenuItem>
          <MenuItem
            component={<Link to="dashboard" className="link" />}
            icon={<GridViewRoundedIcon />}
          >
            Dashboard
          </MenuItem>
          <SubMenu label="Carteira" icon={<WalletRoundedIcon />}>
            <MenuItem icon={<AddCard />} component={<Link to="cadastroConta" className="link" />}>
              Cadastro de Conta
            </MenuItem>
            <MenuItem icon={<AccountBalanceRoundedIcon />} component={<Link to="contas" className="link" />}>Contas</MenuItem>
          </SubMenu>
          <SubMenu label="Movimentações" icon={<MonetizationOnRoundedIcon />}>
            <MenuItem
              icon={<CurrencyExchangeIcon />}
              component={<Link to="cadastroMovimentacao" className="link" />}
            >
              Cadastro de Movimentação
            </MenuItem>
            <MenuItem
              icon={<PriceChangeIcon />}
              component={<Link to="movimentacoes" className="link" />}
            >
              Lista de Movimentação
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<LogoutRoundedIcon />} component={<Link to="login" className="link" />} onClick={logoutUser}> Logout </MenuItem>
        </Menu>
      </Sidebar>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </section>
    </div >

  );
}