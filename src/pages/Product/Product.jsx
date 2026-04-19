import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/features/cartSlice';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { FiShoppingCart, FiShield, FiTruck, FiCreditCard } from 'react-icons/fi';
import Spinner from '../../components/Spinner/Spinner';
import './product.scss';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.itemsReducer);

    useEffect(() => {
        const productDetail = items.find((item) => +item.id === +id);
        setProduct(productDetail || null);
    }, [id, items]);

    return (
        <section className="product-page">
            <div className="page-container">
                <div className="back-shop">
                    <Link to="/shop">
                        <HiOutlineArrowNarrowLeft />
                        <span>Вернуться в каталог</span>
                    </Link>
                </div>

                {loading ? (
                    <div className="loading-wrap">
                        <Spinner />
                    </div>
                ) : error ? (
                    <div className="fetch-error">
                        <p>😕 Ошибка: {error}</p>
                        <p>Проверьте интернет и обновите страницу</p>
                    </div>
                ) : !product ? (
                    <div className="fetch-error">
                        <p>Товар не найден</p>
                    </div>
                ) : (
                    <div className="product-layout">
                        <div className="product-gallery">
                            <div className="product-image-card">
                                <img src={product.image} alt={product.title} />
                                {product.oldPrice && <span className="product-badge">Акция</span>}
                            </div>
                        </div>

                        <div className="product-info">
                            <span className="product-category">{product.category}</span>

                            <h1>{product.title}</h1>

                            <p className="product-description">
                                {product.content || 'Качественная бытовая техника для дома с удобным функционалом и современным дизайном.'}
                            </p>

                            <div className="product-prices">
                                {product.oldPrice ? (
                                    <>
                                        <del>{product.oldPrice}.00 сом</del>
                                        <span>{product.price}.00 сом</span>
                                    </>
                                ) : (
                                    <span>{product.price}.00 сом</span>
                                )}
                            </div>

                            <button
                                className="add-to-cart-btn"
                                onClick={() => dispatch(addToCart(product))}
                            >
                                <FiShoppingCart />
                                <span>Добавить в корзину</span>
                            </button>

                            <div className="product-benefits">
                                <div className="benefit-card">
                                    <div className="benefit-icon">
                                        <FiShield />
                                    </div>
                                    <div>
                                        <h4>Гарантия качества</h4>
                                        <p>Только надежная и проверенная техника.</p>
                                    </div>
                                </div>

                                <div className="benefit-card">
                                    <div className="benefit-icon">
                                        <FiTruck />
                                    </div>
                                    <div>
                                        <h4>Доставка по Бишкеку</h4>
                                        <p>Оперативная доставка и удобное оформление заказа.</p>
                                    </div>
                                </div>

                                <div className="benefit-card">
                                    <div className="benefit-icon">
                                        <FiCreditCard />
                                    </div>
                                    <div>
                                        <h4>Удобная оплата</h4>
                                        <p>Наличный и безналичный расчет для покупателей.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Product;
