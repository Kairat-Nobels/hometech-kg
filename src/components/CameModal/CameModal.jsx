import { useEffect, useRef, useState } from "react";
import styles from './cameModal.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../store/slices/adminSlice";
import { FiLock, FiUser, FiX, FiShield } from "react-icons/fi";

function CameModal({ setModal }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [submitError, setSubmitError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const closeModal = (e) => {
        if (formRef.current && !formRef.current.contains(e.target)) {
            setModal(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        const res = await dispatch(loginAdmin({ login, password }));

        if (res.meta.requestStatus === 'fulfilled') {
            setModal(false);
            navigate('/admin');
        } else {
            setSubmitError('Неверный логин или пароль');
        }
    };

    return (
        <div onClick={closeModal} className={styles.window}>
            <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
                <button
                    type="button"
                    onClick={() => setModal(false)}
                    className={styles.closeButton}
                    aria-label="Закрыть"
                >
                    <FiX />
                </button>

                <div className={styles.badge}>
                    <FiShield />
                    <span>Панель администратора</span>
                </div>

                <h2>Вход в админку</h2>
                <p className={styles.subtitle}>
                    Введите логин и пароль для доступа к управлению магазином.
                </p>

                <div className={styles.field}>
                    <label htmlFor="admin-login">Логин</label>
                    <div className={styles.inputShell}>
                        <FiUser />
                        <input
                            id="admin-login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Введите логин"
                            required
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="admin-password">Пароль</label>
                    <div className={styles.inputShell}>
                        <FiLock />
                        <input
                            id="admin-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Введите пароль"
                            required
                        />
                    </div>
                </div>

                {submitError && <div className={styles.error}>{submitError}</div>}

                <button type="submit" className={styles.submitButton}>
                    Войти
                </button>
            </form>
        </div>
    );
}

export default CameModal;
