import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import "./header.scss";
import { HiShoppingCart } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { FiUser, FiZap, FiGrid } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import { getOrders } from '../../store/slices/ordersSlice';
import { getReviews } from '../../store/slices/reviewsSlice';
import CameModal from '../CameModal/CameModal';
import { getItems } from '../../store/slices/itemsSlice';
import { getCategories } from '../../store/slices/categoriesSlice';
import { setCategory } from '../../store/features/filterSlice';
import TickerBar from '../TickerBar/TickerBar';

const Header = () => {
    const [hamburger, setHamburger] = useState(true);
    const [nav, setNav] = useState(false);
    const [modal, setModal] = useState(false);

    const cart = useSelector((state) => state.cart.cart);
    const { categories } = useSelector((state) => state.categoriesReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(getItems());
        dispatch(getReviews());
        dispatch(getOrders());
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        closeHamburger();
    }, [location.pathname]);

    const getTotalQuantity = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity;
        });
        return total;
    };

    const getTotalPrice = () => {
        let total = 0;
        cart.forEach((item) => {
            total += Math.round(item.price) * item.quantity;
        });
        return total;
    };

    const changeCategory = (category) => {
        dispatch(setCategory(category));
        navigate('/shop');
    };

    const closeHamburger = () => {
        setNav(false);
        setHamburger(true);
    };

    const openHamburger = () => {
        setNav(true);
        setHamburger(false);
    };

    const handleAdminClick = () => {
        if (localStorage.getItem('admin') === "true") {
            navigate('/admin');
        } else {
            setModal(true);
        }
        closeHamburger();
    };

    const featuredCategories = categories || [];

    return (
        <>
            <header className="site-header">
                <div className="page-container">
                    <div className="header-content">
                        <div className="header-left">
                            <div className="logo-part">
                                <Link to="/" className="logo-link">
                                    <div className="logo-icon">
                                        <FiZap />
                                    </div>
                                    <div className="logo-text">
                                        <h2>HOME TECH KG</h2>
                                        <p>техника для дома</p>
                                    </div>
                                </Link>
                            </div>

                            <ul className="desktop-nav list-unstyled m-0">
                                <li>
                                    <button
                                        className="clean-button nav-pill catalog-pill"
                                        onClick={() => changeCategory("All")}
                                    >
                                        <FiGrid />
                                        <span>Каталог</span>
                                    </button>
                                </li>

                                {featuredCategories.map((category) => (
                                    <li key={category.id}>
                                        <button
                                            className="clean-button nav-pill"
                                            onClick={() => changeCategory(category.name)}
                                        >
                                            {category.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="header-right">
                            <button className="admin-button" onClick={handleAdminClick}>
                                <FiUser />
                                <span>Админ</span>
                            </button>

                            <p className="price">{getTotalPrice()}.00 сом</p>

                            <div className="cart">
                                <Link to="/cart" aria-label="Корзина">
                                    <HiShoppingCart />
                                </Link>
                                <p className="cart-quantity">{getTotalQuantity()}</p>
                            </div>

                            <div className="hamburger-menu">
                                {hamburger ? (
                                    <button onClick={openHamburger} aria-label="Открыть меню">
                                        <GiHamburgerMenu />
                                    </button>
                                ) : (
                                    <button onClick={closeHamburger} aria-label="Закрыть меню">
                                        <IoCloseSharp />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <ul className={nav ? 'mobile-nav open-nav list-unstyled m-0' : 'mobile-nav list-unstyled m-0'}>
                    <li>
                        <button
                            className="clean-button"
                            onClick={() => {
                                changeCategory("All");
                                closeHamburger();
                            }}
                        >
                            Все товары
                        </button>
                    </li>

                    {categories?.map((category) => (
                        <li key={category.id}>
                            <button
                                className="clean-button"
                                onClick={() => {
                                    changeCategory(category.name);
                                    closeHamburger();
                                }}
                            >
                                {category.name}
                            </button>
                        </li>
                    ))}

                    <li>
                        <button
                            className="clean-button mobile-admin-button"
                            onClick={handleAdminClick}
                        >
                            Админ-панель
                        </button>
                    </li>
                </ul>
            </header>

            {modal && <CameModal setModal={setModal} />}

            <main>
                <Outlet />
            </main>
            <Footer />
            <TickerBar />
        </>
    );
};

export default Header;
