import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiMapPin, FiPhoneCall, FiMail } from 'react-icons/fi';
import './footer.scss';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="page-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <div className="footer-logo-icon">
                                <FiZap />
                            </div>
                            <div className="footer-logo-text">
                                <h3>HOME TECH KG</h3>
                                <p>интернет-магазин бытовой техники</p>
                            </div>
                        </div>

                        <p className="footer-description">
                            Современная бытовая техника для дома в Бишкеке.
                            Удобный выбор, выгодные цены и надежный сервис.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4>Навигация</h4>
                        <div className="footer-nav-list">
                            <Link to="/">Главная</Link>
                            <Link to="/shop">Каталог</Link>
                            <Link to="/cart">Корзина</Link>
                            <Link to="/admin">Админ</Link>
                        </div>
                    </div>

                    <div className="footer-contacts">
                        <h4>Контакты</h4>

                        <div className="footer-contact-item">
                            <FiMapPin />
                            <span>Бишкек, Кыргызстан</span>
                        </div>

                        <div className="footer-contact-item">
                            <FiPhoneCall />
                            <span>+996 999 779 947</span>
                        </div>

                        <div className="footer-contact-item">
                            <FiMail />
                            <span>hometechkg.store@gmail.com</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 HOME TECH KG. Все права защищены.</span>
                    <span className="footer-made-by">
                        Интернет-магазин бытовой техники
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;