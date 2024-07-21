import React, { useCallback, useContext, useEffect, useState } from "react";
import classes from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../../ui/Form/TextField";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

const RegisterPage = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    const [data, setData] = useState({
        login: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = useCallback((target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    }, []);



    const validateScheme = yup.object().shape({
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
        password: yup.string()
            .required("Пароль обязателен для заполнения")
            .matches(
                /(?=.*[A-Z])/,
                "Пароль должен содержать хотя бы одну букву Латиницы"
            )
            .matches(
                /(?=.[0-9])/,
                "Пароль должен содержать хотя бы одно число"
            )
            .matches(
                /(?=.{8,})/,
                "Пароль должен быть минимум из 8 символов"
            ),

        login: yup.string()
            .required("Логин обязателен для заполнения")
            .min(3, "Логин должен содержать минимум 3 символа")
            .max(15, "Логин должен содержать не более 15 символов")
            .matches(/^[a-zA-Z0-9а-яА-Я]*$/, "Логин может содержать только буквы латиницы, буквы кириллицы и цифры")
            .matches(/^[^!"№;%:?*]*$/, "Логин не может содержать специальные символы: !\"№;%:?*")
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

    const isValid = Object.keys(errors).length == 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();

        if (!isValid) return;
        try {
            await store.registration(data.login, data.password);
            if (!store.isLoading) {
                if (store.isAuth) {
                    navigate("/");
                }
            };
        } catch (error) {
            console.log(error);
            // if (error.response && error.response.data.message.includes('Пользователь с логином ')) {
            //     toast.error(error.response.data.message);
            //     setErrors({ login: error.response.data.message });
            // } else {
            //     console.error("Error adding key to database:", error);
            //     toast.error("Произошла ошибка при регистрации");
            // }
        }
    };
    return (
        <div className={classes.registerPage}>
            <form onSubmit={handleSubmit} className={classes.registerBlock}>
                <p className={classes.registerBlock__title}>Регистрация</p>
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
                <TextField
                    type="password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    placeholder="Подтверждение пароля"
                    error={errors.confirmPassword}
                />
                <button className={classes.registerBlock__btnBlack} type="submit" disabled={!isValid}>
                    Зарегистрироваться
                </button>
                <button className={classes.registerBlock__btnWhite}>
                    <Link to="/login">Войти</Link>
                </button>
            </form>
        </div>
    );
};

export default observer(RegisterPage);
