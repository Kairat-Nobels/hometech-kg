import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiMessageSquare, FiPhone, FiUser, FiSend } from 'react-icons/fi';
import { createReview } from '../../store/slices/reviewsSlice';
import './contact.scss';

const Contact = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [isValid, setIsValid] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !comment || !isValid) return;

        dispatch(createReview({ name, phone, comment }));

        setName('');
        setPhone('');
        setComment('');
        setIsValid(false);
    };

    return (
        <section className="contact-review-section">
            <div className="page-container">
                <div className="contact-review-wrapper">
                    <div className="contact-review-info">
                        <span className="contact-label">Обратная связь</span>
                        <h2>Оставьте отзыв о HOME TECH KG</h2>
                        <p>
                            Нам важно мнение покупателей. Расскажите, как прошла покупка,
                            понравилось ли качество товара и обслуживание.
                        </p>

                        <div className="contact-points">
                            <div className="contact-point">
                                <div className="contact-point-icon">
                                    <FiMessageSquare />
                                </div>
                                <div>
                                    <h4>Честные отзывы</h4>
                                    <p>Ваше мнение помогает нам улучшать сервис и магазин.</p>
                                </div>
                            </div>

                            <div className="contact-point">
                                <div className="contact-point-icon">
                                    <FiSend />
                                </div>
                                <div>
                                    <h4>Быстрая отправка</h4>
                                    <p>Заполните форму, и отзыв сразу попадет в систему.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-review-form-block">
                        <form onSubmit={handleSubmit} className="contact-review-form">
                            <div className="input-group-custom">
                                <label>Ваше имя</label>
                                <div className="input-shell">
                                    <FiUser />
                                    <input
                                        type="text"
                                        placeholder="Введите ваше имя"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group-custom">
                                <label>Телефон</label>
                                <div className="input-shell">
                                    <FiPhone />
                                    <input
                                        type="tel"
                                        placeholder="Например: (700)-123-456"
                                        value={phone}
                                        onChange={handlePhoneNumberChange}
                                        required
                                    />
                                </div>

                                {!isValid && phone.length > 0 && (
                                    <div className="input-error">Неверный номер телефона</div>
                                )}
                            </div>

                            <div className="input-group-custom">
                                <label>Ваш отзыв</label>
                                <div className="textarea-shell">
                                    <textarea
                                        placeholder="Напишите ваш отзыв"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                        rows={5}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="submit-review-btn"
                                disabled={!name || !phone || !isValid || !comment}
                            >
                                Отправить отзыв
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
