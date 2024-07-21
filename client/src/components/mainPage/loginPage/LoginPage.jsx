import React, { useCallback, useEffect, useState } from "react";
import classes from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import 'react-toastify/dist/ReactToastify.css';
import TextField from "../../ui/Form/TextField";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import * as yup from "yup";

const LoginPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        login: "",
        password: "",
    });
    const { store } = useContext(Context);
    const [errors, setErrors] = useState({});

    const validateScheme = yup.object().shape({
        password: yup.string()
            .required("Пароль обязателен для заполнения"),
        login: yup.string()
            .required("Логин обязателен для заполнения")
    });


    const validate = useCallback(async () => {
        try {
            await validateScheme.validate(data);
            setErrors({});
            return true;
        } catch (err) {
            setErrors({ [err.path]: err.message });
            return false;
        }
    }, [data]);

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();

        if (!isValid) return;
        try {
            await store.login(data.login, data.password, navigate);
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange = useCallback((target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    }, []);
    return (
        <div className={classes.loginPage}>
            <form onSubmit={handleSubmit} className={classes.loginBlock}>
                <p className={classes.loginBlock__title}>Вход</p>
                <TextField
                    type="text"
                    name="login"
                    value={data.login}
                    onChange={handleChange}
                    placeholder="Логин"
                    error={errors.login}
                />
                <TextField
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Пароль"
                    error={errors.password}
                />
                <button type="submit" className={classes.loginBlock__btnBlack}>
                    Войти
                </button>
                <button className={classes.loginBlock__btnWhite}>
                    <Link to="/registration">Зарегистрироваться</Link>
                </button>
            </form>
        </div>
    );
};

export default observer(LoginPage);
