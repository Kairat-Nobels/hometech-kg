import React from 'react';
import './connect.scss';
import {
    AiFillFacebook,
    AiFillInstagram,
    AiOutlineWhatsApp,
} from 'react-icons/ai';
import { FiMapPin, FiPhoneCall, FiMail } from 'react-icons/fi';

const Connect = () => {
    const socialLinks = [
        {
            id: 1,
            icon: <AiFillFacebook />,
            title: 'Facebook',
            subtitle: 'Новости и акции',
            link: 'https://www.facebook.com/',
        },
        {
            id: 2,
            icon: <AiOutlineWhatsApp />,
            title: 'WhatsApp',
            subtitle: 'Быстрая связь',
            link: 'https://wa.me/996999779947',
        },
        {
            id: 3,
            icon: <AiFillInstagram />,
            title: 'Instagram',
            subtitle: 'Новинки и обзоры',
            link: 'https://www.instagram.com/',
        },
    ];

    return (
        <section className="connect-section">
            <div className="page-container">
                <div className="connect-wrapper">
                    <div className="connect-left">
                        <span className="connect-label">Связь с нами</span>
                        <h2>Оставайтесь на связи с HOME TECH KG</h2>
                        <p>
                            Следите за новинками, акциями и популярными товарами.
                            Вы можете написать нам в удобной социальной сети или связаться напрямую.
                        </p>

                        <div className="connect-info">
                            <div className="connect-info-item">
                                <div className="connect-info-icon">
                                    <FiMapPin />
                                </div>
                                <div>
                                    <h4>Адрес</h4>
                                    <p>г. Бишкек, Кыргызстан</p>
                                </div>
                            </div>

                            <div className="connect-info-item">
                                <div className="connect-info-icon">
                                    <FiPhoneCall />
                                </div>
                                <div>
                                    <h4>Телефон</h4>
                                    <p>+996 999 779 947</p>
                                </div>
                            </div>

                            <div className="connect-info-item">
                                <div className="connect-info-icon">
                                    <FiMail />
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <p>hometechkg.store@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="connect-right">
                        <div className="social-grid">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.id}
                                    href={item.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="social-card"
                                >
                                    <div className="social-icon">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Connect;