import React, { useContext, useState } from "react";
import classes from "./AdminPanel.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import OrderItem from "./orderItem/OrderItem";
import orderService from "../../../services/order.service";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../../..";

const AdminPanel = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [alldataorders, Setalldataorders] = useState([]);
    const hadleallInfoOrder = async () => {
        try {
            if (!store.isLoading) {
                if (store.isAuth) {
                    if (store.profile.role === "admin") {
                        const response = await orderService.getAll();
                        const AllDataOrders = response;
                        Setalldataorders(AllDataOrders);
                        // console.log(AllDataOrders);
                    } else {
                        navigate('/')
                    }
                }
            }
        } catch (error) {
            if (error.response && error.response.data.message === "Доступ запрещен. У пользователя недостаточно прав.") {
                toast.error("У вас нет достаточных прав");
            } else {
                console.error(error);
            }
        }
    };
    useEffect(() => {
        hadleallInfoOrder();
    }, []);
    if (!store.isLoading) {
        if (store.isAuth) {
            if (store.profile.role === "admin") {
                return (

                    alldataorders && (
                        <div className={classes.adminPanel}>
                            <Link to="/" className={classes.adminInfo__back}>
                                Вернуться на главную
                            </Link>
                            <p className={classes.adminInfo__title}>Админ панель</p>
                            <div className={classes.ordersList}>
                                {alldataorders.map((el) => (
                                    <OrderItem
                                        key={el.id}
                                        orderInfo={el}
                                        allOrders={alldataorders}
                                        setAllOrders={Setalldataorders}
                                        updateOrders={hadleallInfoOrder}
                                    />
                                ))}
                            </div>
                        </div>
                    )

                );
            }
        }
    }
};

export default AdminPanel;
