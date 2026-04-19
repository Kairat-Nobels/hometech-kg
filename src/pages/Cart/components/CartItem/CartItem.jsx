import React from 'react';
import { useDispatch } from 'react-redux';
import {
    decrementQuantity,
    incrementQuantity,
    removeItem
} from '../../../../store/features/cartSlice';
import { IoIosCloseCircleOutline } from "react-icons/io";
import './cartItem.scss';

const CartItem = ({ image, title, price, quantity, category, item }) => {
    const dispatch = useDispatch();

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={image} alt={title} />
            </div>

            <div className="cart-item-content">
                <span className="cart-item-category">{category}</span>
                <h3 className="cart-item-title">{title}</h3>
            </div>

            <div className="cart-item-quantity">
                <button
                    className="quantity-button"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                >
                    -
                </button>

                <span className="quantity-value">{quantity}</span>

                <button
                    className="quantity-button"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                >
                    +
                </button>
            </div>

            <div className="cart-item-price">
                <h4>{price * quantity}.00 сом</h4>
            </div>

            <div className="cart-item-remove">
                <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="cart-trash"
                    aria-label="Удалить товар"
                >
                    <IoIosCloseCircleOutline />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
