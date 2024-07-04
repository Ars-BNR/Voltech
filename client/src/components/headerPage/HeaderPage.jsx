import React, { useEffect, useState } from "react";
import classes from "./HeaderPage.module.css";
import HeaderProfile from "./headerProfile/HeaderProfile";
import HeaderButton from "./headerButton/HeaderButton";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../AuthContext";
import { Context } from "../..";
import { observer } from "mobx-react-lite"

const HeaderPage = () => {
    const { store } = useContext(Context);
    console.log('status isAuth', store.isAuth);

    return (
        <div className={classes.header}>
            <div className={classes.header__container}>
                <div className={classes.voltechHeader}>
                    <Link to="/" className={classes.voltechHeader__title}>
                        Voltech
                    </Link>
                    {store.isAuth ? (
                        <HeaderProfile />
                    ) : (
                        <HeaderButton />
                    )}
                </div>
            </div>
        </div>
    );
};

export default observer(HeaderPage);