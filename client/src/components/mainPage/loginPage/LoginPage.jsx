import React, { useCallback, useState } from "react";
import classes from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TextField from "../../ui/Form/TextField";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
const LoginPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        login: "",
        password: "",
    });
    const { store } = useContext(Context);
    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await store.login(data.login, data.password);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data.message.includes('Неверный пароль')) {
                toast.error(error.response.data.message);
                setErrors({ login: error.response.data.message });
            }
            if (error.response && error.response.status === 401) {
                toast.error("Пользователь с таким логином и паролем не найден");
            } else {
                console.error("Error adding key to database:", error);
            }
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
