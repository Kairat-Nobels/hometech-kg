import React, { useEffect } from 'react';
import CartPayment from './components/CartPayment/CartPayment';
import './cart.scss';

const Cart = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <section className="cart-page">
            <div className="page-container">
                <CartPayment />
            </div>
        </section>
    );
};

export default Cart;