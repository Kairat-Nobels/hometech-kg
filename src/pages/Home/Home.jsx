import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    FiTruck,
    FiShield,
    FiCreditCard,
    FiHeadphones,
    FiArrowRight,
} from 'react-icons/fi';
import {
    HiDeviceMobile,
    HiDesktopComputer,
    HiHome,
    HiLightningBolt,
} from 'react-icons/hi';
import ProductCard from '../../components/ProductCard/ProductCard';
import Spinner from '../../components/Spinner/Spinner';
import './home.scss';
import TestimonialsSection from './components/TelstimonialsSection/TestimonialsSection';
import Connect from '../../components/Connect/Connect';
import Contact from '../../components/Contact/Contact';

const Home = () => {
    const { items, loading, error } = useSelector((state) => state.itemsReducer);

    const popularProducts = Array.isArray(items) ? items.slice(0, 8) : [];

    const categories = [
        {
            id: 1,
            title: 'Холодильники',
            icon: <HiHome />,
            description: 'Надежные модели для кухни и дома',
        },
        {
            id: 2,
            title: 'Телевизоры',
            icon: <HiDesktopComputer />,
            description: 'Smart TV и современные экраны',
        },
        {
            id: 3,
            title: 'Стиральные машины',
            icon: <HiLightningBolt />,
            description: 'Практичные решения на каждый день',
        },
        {
            id: 4,
            title: 'Смартфоны и гаджеты',
            icon: <HiDeviceMobile />,
            description: 'Популярные устройства и аксессуары',
        },
    ];

    const advantages = [
        {
            id: 1,
            icon: <FiTruck />,
            title: 'Быстрая доставка',
            text: 'Оперативная доставка по Бишкеку и удобное оформление заказа.',
        },
        {
            id: 2,
            icon: <FiShield />,
            title: 'Гарантия качества',
            text: 'Только проверенные товары и надежные бренды.',
        },
        {
            id: 3,
            icon: <FiCreditCard />,
            title: 'Удобная оплата',
            text: 'Наличный и безналичный расчет для покупателей.',
        },
        {
            id: 4,
            icon: <FiHeadphones />,
            title: 'Поддержка клиентов',
            text: 'Поможем подобрать технику под ваш бюджет и задачи.',
        },
    ];

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="page-container">
                    <div className="hero-wrapper">
                        <div className="hero-content">
                            <span className="hero-badge">HOME TECH KG</span>
                            <h1>
                                Современная бытовая
                                <span> техника для вашего дома</span>
                            </h1>
                            <p>
                                Интернет-магазин бытовой техники в Бишкеке. Выбирайте популярные
                                товары для кухни, дома и повседневной жизни по выгодным ценам.
                            </p>

                            <div className="hero-actions">
                                <Link to="/shop" className="hero-btn primary-btn">
                                    Перейти в каталог
                                </Link>
                                <a href="#popular-products" className="hero-btn secondary-btn">
                                    Популярные товары
                                </a>
                            </div>

                            <div className="hero-info-row">
                                <div className="hero-info-card">
                                    <strong>1000+</strong>
                                    <span>товаров в каталоге</span>
                                </div>
                                <div className="hero-info-card">
                                    <strong>24/7</strong>
                                    <span>поддержка клиентов</span>
                                </div>
                                <div className="hero-info-card">
                                    <strong>Доставка</strong>
                                    <span>по Бишкеку</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-visual">
                            <div className="hero-main-card">
                                <div className="hero-card-label">Лучшие предложения</div>
                                <h3>Техника, которая делает дом удобнее</h3>
                                <p>
                                    Холодильники, телевизоры, стиральные машины, пылесосы,
                                    микроволновки и другая техника для вашего дома.
                                </p>
                            </div>

                            <div className="hero-mini-grid">
                                <div className="hero-mini-card">
                                    <span>Акции</span>
                                    <p>Скидки на популярные модели</p>
                                </div>
                                <div className="hero-mini-card">
                                    <span>Новинки</span>
                                    <p>Актуальная техника этого сезона</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="categories-section">
                <div className="page-container">
                    <div className="section-top">
                        <div>
                            <span className="section-label">Категории</span>
                            <h2>Популярные категории техники</h2>
                        </div>
                        <Link to="/shop" className="section-link">
                            Смотреть каталог <FiArrowRight />
                        </Link>
                    </div>

                    <div className="categories-grid">
                        {categories.map((category) => (
                            <Link to="/shop" className="category-card" key={category.id}>
                                <div className="category-icon">{category.icon}</div>
                                <h3>{category.title}</h3>
                                <p>{category.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="advantages-section">
                <div className="page-container">
                    <div className="section-top center">
                        <div>
                            <span className="section-label">Преимущества</span>
                            <h2>Почему выбирают HOME TECH KG</h2>
                        </div>
                    </div>

                    <div className="advantages-grid">
                        {advantages.map((item) => (
                            <div className="advantage-card" key={item.id}>
                                <div className="advantage-icon">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="promo-section">
                <div className="page-container">
                    <div className="promo-banner">
                        <div className="promo-text">
                            <span>Специальное предложение</span>
                            <h2>Скидки на популярную бытовую технику</h2>
                            <p>
                                Следите за актуальными предложениями и обновляйте дом современной
                                техникой вместе с HOME TECH KG.
                            </p>
                        </div>

                        <Link to="/shop" className="promo-btn">
                            Перейти к покупкам
                        </Link>
                    </div>
                </div>
            </section>

            <section className="home-products-section" id="popular-products">
                <div className="page-container">
                    <div className="section-top">
                        <div>
                            <span className="section-label">Товары</span>
                            <h2>Популярные товары</h2>
                        </div>
                        <Link to="/shop" className="section-link">
                            Все товары <FiArrowRight />
                        </Link>
                    </div>

                    <div className="row">
                        {loading ? (
                            <Spinner />
                        ) : error ? (
                            <div className="fetch-error">
                                <p>Ошибка: {error}</p>
                                <p>Проверь подключение и обнови страницу.</p>
                            </div>
                        ) : (
                            popularProducts.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    item={item}
                                    image={item.image}
                                    title={item.title}
                                    category={item.category}
                                    price={item.price}
                                    oldPrice={item.oldPrice}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>

            <TestimonialsSection />
            <Connect />
            <Contact />
        </div>
    );
};

export default Home;
