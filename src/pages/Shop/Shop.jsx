import React from 'react';
import ShopProducts from './components/ShopProducts/ShopProducts';
import './shop.scss';

const Shop = () => {
    return (
        <section className="shop-page">
            <div className="page-container">
                <ShopProducts />
            </div>
        </section>
    );
};

export default Shop;
