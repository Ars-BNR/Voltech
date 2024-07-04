import React from "react";
import cl from "./Page.module.css"
import { Outlet } from "react-router-dom";
import HeaderPage from "./headerPage/HeaderPage";
import FooterPage from "./footerPage/FooterPage";
const Page = () => {
    return (
        <div className={cl.wrapper}>
            <HeaderPage />
            <div className={cl.main}>
                <div className={cl.main__container}>
                    <Outlet />
                </div>
            </div>
            <FooterPage />
        </div>
    );
};

export default Page;