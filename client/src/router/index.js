import AdminPanel from "../components/mainPage/adminPanel/AdminPanel";
import BasketPage from "../components/mainPage/basketPage/BasketPage";
import CatalogPage from "../components/mainPage/catalogPage/CatalogPage";
import InformationAboutOrder from "../components/mainPage/informationAboutOrder/InformationAboutOrder";
import LoginPage from "../components/mainPage/loginPage/LoginPage";
import MakingOrder from "../components/mainPage/makingOrder/MakingOrder";
import OrdersInfo from "../components/mainPage/ordersInfo/OrdersInfo";
import PersonalPageEquipment from "../components/mainPage/personalPageEquipment/PersonalPageEquipment";
import RegisterPage from "../components/mainPage/registerPage/RegisterPage";

export const routesList = [
  { path: "/registration", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/catalog", element: <CatalogPage /> },
  { path: "/basket", element: <BasketPage /> },
  { path: "/makingOrder", element: <MakingOrder /> },
  { path: "/ordersInfo", element: <OrdersInfo /> },
  { path: "/info/:id", element: <InformationAboutOrder /> },
  { path: "/personalPageEquipment/:id", element: <PersonalPageEquipment /> },
  { path: "/adminPanel", element: <AdminPanel /> },
];
