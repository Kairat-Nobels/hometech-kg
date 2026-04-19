import React from 'react';
import { Link } from 'react-router-dom';
import "./productCard.scss";
import { HiShoppingCart } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/features/cartSlice';

const ProductCard = ({ image, title, category, price, oldPrice, item }) => {
    const dispatch = useDispatch();

    return (
        <div data-aos="fade-up" className="product-card col-12 col-md-6 col-lg-4 col-xl-3">
            <div className="product-card-inner">
                <div className="product-image">
                    <Link to={`/shop/${item.id}`}>
                        <img src={image} alt={title} />
                    </Link>

                    {oldPrice && <span className="product-sale">Акция</span>}

                    <div className="product-overlay-actions">
                        <button
                            onClick={() => dispatch(addToCart(item))}
                            className="add-cart"
                            type="button"
                        >
                            <HiShoppingCart />
                            <span>В корзину</span>
                        </button>

                        <Link to={`/shop/${item.id}`} className="details-link">
                            <FiArrowUpRight />
                            <span>Подробнее</span>
                        </Link>
                    </div>
                </div>

                <div className="product-info">
                    <span className="product-category">{category}</span>

                    <h3>
                        <Link to={`/shop/${item.id}`}>{title}</Link>
                    </h3>

                    <div className="product-prices">
                        {oldPrice ? (
                            <>
                                <del className="product-price old-price">{oldPrice}.00 сом</del>
                                <span className="product-price current-price">{price}.00 сом</span>
                            </>
                        ) : (
                            <span className="product-price current-price">{price}.00 сом</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
