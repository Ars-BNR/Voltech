import React, { useState, useEffect, useContext } from "react";
import classes from "./CatalogPage.module.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import catalogService from "../../../services/catalog.service";
import basketService from "../../../services/basket.service";
import SortBlock from "./sortBlock/SortBlock";
import NoProductFound from "../../ui/noProductFound/NoProductFound";
import CardList from "./cardList/CardList";
import { convertStringToNumber } from "../../../utils/convertStringToNumber";
import { Context } from "../../..";

const CatalogPage = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [brand, setBrand] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([]);
    const [noProductsFound, setNoProductsFound] = useState(false);
    const [maxPrice, setMaxPrice] = useState();
    const [minPrice, setMinPrice] = useState();
    useEffect(() => {
        fetchProducts();
    }, [selectedBrands, selectedCategory]);

    // useEffect(() => {
    //     console.log('Выбранный бренд', selectedBrands);
    // }, [selectedBrands]);
    const fetchProducts = async (min, max) => {
        // console.log('priceRange', priceRange)
        let params = {
            category: selectedCategory
        };
        if (min && max) {
            params.price = [min, max].join("-");
        } else {
            if (priceRange && priceRange.length > 0) {
                params.price = priceRange.join("-");
            }
        }
        if (selectedBrands && selectedBrands.length > 0) {
            params.brand = selectedBrands.join(",");
        }
        try {
            const productsData = await catalogService.get(params);
            setProducts(productsData);

            if (productsData.length > 0) {
                const prices = productsData.map((el) => el.price);
                if (!minPrice && !maxPrice) {
                    const minPrice = Math.min(...prices);
                    const maxPrice = Math.max(...prices);
                    setMaxPrice(maxPrice);
                    setMinPrice(minPrice);
                    if (priceRange.length === 0) {
                        setPriceRange([minPrice, maxPrice]);
                    }
                    const brands = Array.from(new Set(productsData.map(product => product.main_info["Бренд"])));
                    setBrand(brands);
                }
                setNoProductsFound(false);
            } else {
                setNoProductsFound(true);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };
    const handlePriceInputChange = (min, max) => {

        min = convertStringToNumber(min);

        max = convertStringToNumber(max);
        setPriceRange([min, max])
    };
    const handleOnKeyDownChange = (event, min, max) => {
        if (event.key === 'Enter') {
            min = convertStringToNumber(min);
            max = convertStringToNumber(max);
            if (min > maxPrice) {
                min = maxPrice;
                max = maxPrice
            }
            if (max > maxPrice) {
                max = maxPrice;
            }
            if (min < minPrice) {
                min = minPrice;
            }
            if (max < minPrice) {
                max = maxPrice
            }
            setPriceRange([min, max]);
            fetchProducts(min, max);
        }
    };
    const handleSliderPriceChange = (range) => {
        setPriceRange(range);
    };
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedBrands(prevSelectedBrands => [...prevSelectedBrands, value]);
        }
        else {
            setSelectedBrands(prevSelectedBrands => prevSelectedBrands.filter(brand => brand !== value));
            // console.log('Удаленный бренд', selectedBrands);
        }
    };
    const HandleAddBasket = async (id_equipment) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.info(
                "Чтобы добавить товар в корзину, вам необходимо зарегистрироваться."
            );
            navigate("/register");
            return;
        }
        try {
            const idUsers = store.profile.id;
            const response = await basketService.post(
                { id_equipment: id_equipment, id_user: idUsers, count: 1 }
            );
            // console.log('товар', response);
            toast.success("Товар добавлен в корзину")
        } catch (error) {
            // console.log(error);
        }
    };
    return (
        products && (
            <div className={classes.catalogPage}>
                <SortBlock
                    fetchProducts={fetchProducts}
                    handleCheckboxChange={handleCheckboxChange}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    priceRange={priceRange}
                    brand={brand}
                    selectedBrands={selectedBrands}
                    handleOnKeyDownChange={handleOnKeyDownChange}
                    handlePriceInputChange={handlePriceInputChange}
                    handleSliderPriceChange={handleSliderPriceChange}
                />
                {noProductsFound ? (
                    <NoProductFound />
                ) : (
                    <div className={classes.catalogBlock}>
                        <CardList
                            products={products}
                            HandleAddBasket={HandleAddBasket}
                        />
                    </div>
                )}
            </div>
        )
    );
};

export default CatalogPage;
