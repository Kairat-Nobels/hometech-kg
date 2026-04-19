import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { FiTag, FiMapPin, FiPhone, FiUser, FiShoppingBag } from 'react-icons/fi';
import CartItem from '../CartItem/CartItem';
import PaymentModal from '../PaymentModal/PaymentModal';
import "./cartPayment.scss";
import { createOrder } from '../../../../store/slices/ordersSlice';

const CartPayment = () => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const [promo, setPromo] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [delivery, setDelivery] = useState(false);
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const discount = promoApplied ? 0.2 : 0;

    const getTotalQuantity = () =>
        cart.reduce((sum, item) => sum + item.quantity, 0);

    const getTotalPrice = () =>
        cart.reduce((sum, item) => sum + Math.round(item.price) * item.quantity, 0);

    const getDiscountedPrice = () =>
        Math.round(getTotalPrice() * (1 - discount));

    const handlePromoApply = (e) => {
        e.preventDefault();

        if (promo.trim().toLowerCase() === '2020') {
            setPromoApplied(true);
        } else {
            setPromoApplied(false);
            alert('Промокод неверный');
        }
    };

    const handleCheckout = (e) => {
        e.preventDefault();

        if (!name || !phone || (delivery && !address)) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        if (!isValid) {
            alert('Неверный номер телефона');
            return;
        }

        const orderData = {
            order: cart.map((item) => ({
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                price: item.price
            })),
            date: new Date().toISOString(),
            name,
            phone,
            address: delivery ? address : "",
            amount: getDiscountedPrice(),
            status: "Заказано"
        };

        dispatch(createOrder(orderData));
        setShowModal(true);
    };

    const handlePhoneNumberChange = (event) => {
        let input = event.target.value.replace(/\D/g, '');

        if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
            setIsValid(false);
            setPhone(input);
            return;
        }

        input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, '($1)-$2-$3');
        setIsValid(/^\(\d{3}\)-\d{3}-\d{3}$/.test(input));
        setPhone(input);
    };

    return (
        <div className="cart-payment">
            <div className="cart-layout">
                <div className="cart-left">
                    <div className="cart-head">
                        <div>
                            <span className="cart-label">Корзина</span>
                            <h1>Ваш заказ</h1>
                        </div>
                        <div className="cart-count">
                            {getTotalQuantity()} товаров
                        </div>
                    </div>

                    <div className={`cart-products ${cart.length === 0 ? "empty" : ""}`}>
                        {cart.length === 0 ? (
                            <div className="empty-cart">
                                <div className="empty-cart-icon">
                                    <FiShoppingBag />
                                </div>
                                <h3>Корзина пуста</h3>
                                <p>Добавьте товары в корзину, чтобы оформить заказ.</p>
                                <Link to="/shop" className="go-shop-btn">
                                    Перейти в каталог
                                </Link>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    quantity={item.quantity}
                                    image={item.image}
                                    title={item.title}
                                    category={item.category}
                                    price={item.price}
                                />
                            ))
                        )}
                    </div>

                    <div className="back-shop">
                        <Link to="/shop">
                            <HiOutlineArrowNarrowLeft />
                            <span>Вернуться в каталог</span>
                        </Link>
                    </div>
                </div>

                <div className="cart-right">
                    <div className="checkout-card">
                        <h2>Оформление заказа</h2>

                        {cart.length === 0 ? (
                            <div className="checkout-empty">
                                Добавьте товары в корзину для оформления заказа
                            </div>
                        ) : (
                            <form onSubmit={handleCheckout} className="checkout-form">
                                <div className="form-group">
                                    <label>Имя</label>
                                    <div className="input-shell">
                                        <FiUser />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Введите имя"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Телефон</label>
                                    <div className="input-shell">
                                        <FiPhone />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={handlePhoneNumberChange}
                                            placeholder="Например: (700)-123-456"
                                            required
                                        />
                                    </div>
                                    {!isValid && phone.length > 0 && (
                                        <div className="input-error">Неверный номер телефона</div>
                                    )}
                                </div>

                                <div className="delivery-toggle">
                                    <label className="delivery-check">
                                        <input
                                            type="checkbox"
                                            checked={delivery}
                                            onChange={(e) => setDelivery(e.target.checked)}
                                        />
                                        <span>Нужна доставка</span>
                                    </label>
                                </div>

                                {delivery && (
                                    <div className="form-group">
                                        <label>Адрес доставки</label>
                                        <div className="input-shell">
                                            <FiMapPin />
                                            <input
                                                type="text"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Введите адрес"
                                                required={delivery}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Промокод</label>
                                    <div className="promo-row">
                                        <div className="input-shell">
                                            <FiTag />
                                            <input
                                                type="text"
                                                value={promo}
                                                onChange={(e) => setPromo(e.target.value)}
                                                placeholder="Введите промокод"
                                                disabled={promoApplied}
                                            />
                                        </div>
                                        <button
                                            className="promo-btn"
                                            onClick={handlePromoApply}
                                            disabled={promoApplied}
                                            type="button"
                                        >
                                            Применить
                                        </button>
                                    </div>

                                    {promoApplied && (
                                        <div className="promo-success">Промокод применён! Скидка 20%</div>
                                    )}
                                </div>

                                <div className="checkout-total">
                                    <div className="total-row">
                                        <span>Товаров</span>
                                        <strong>{getTotalQuantity()}</strong>
                                    </div>

                                    <div className="total-row">
                                        <span>Сумма</span>
                                        <strong>{getTotalPrice()} сом</strong>
                                    </div>

                                    {promoApplied && (
                                        <div className="total-row discount">
                                            <span>Скидка</span>
                                            <strong>-20%</strong>
                                        </div>
                                    )}

                                    <div className="total-row final">
                                        <span>Итого</span>
                                        <strong>{getDiscountedPrice()} сом</strong>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="checkout-btn"
                                    disabled={!name || !phone || !isValid || (delivery && !address)}
                                >
                                    Перейти к оплате
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <PaymentModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                promoApplied={promoApplied}
                discount={discount}
            />
        </div>
    );
};

export default CartPayment;
