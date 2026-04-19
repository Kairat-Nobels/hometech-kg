import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './adminLayout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { outAdmin } from '../../store/slices/adminSlice';
import { getItems } from '../../store/slices/itemsSlice';
import { getOrders } from '../../store/slices/ordersSlice';
import { getCategories } from '../../store/slices/categoriesSlice';
import { getReviews } from '../../store/slices/reviewsSlice';
import { FiHome, FiLogOut, FiPackage, FiMessageSquare, FiGrid, FiClipboard } from 'react-icons/fi';

function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { valid } = useSelector((state) => state.adminReducer);
  const location = useLocation();

  useEffect(() => {
    if (valid && location.pathname === '/admin') {
      navigate('/admin/orders');
    }

    dispatch(getOrders());
    dispatch(getItems());
    dispatch(getCategories());
    dispatch(getReviews());
  }, [valid, location.pathname, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(outAdmin());
    navigate('/');
  };

  if (!valid) {
    return (
      <div className={styles.notWelcomeWrapper}>
        <div className={styles.notWelcome}>
          <span className={styles.notWelcomeBadge}>Доступ ограничен</span>
          <h2>Вы должны войти как администратор</h2>
          <button className={styles.backButton} onClick={handleLogout}>
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <div className="page-container">
        <div className={styles.wrapper}>
          <div className={styles.topbar}>
            <div className={styles.topbarLeft}>
              <span className={styles.panelBadge}>Панель управления</span>
              <h1>Администратор HOME TECH KG</h1>
              <p>Управление товарами, заказами, отзывами и категориями магазина.</p>
            </div>

            <div className={styles.topbarActions}>
              <button className={styles.homeButton} onClick={() => navigate('/')}>
                <FiHome />
                <span>Главная</span>
              </button>

              <button className={styles.logoutButton} onClick={handleLogout}>
                <FiLogOut />
                <span>Выйти</span>
              </button>
            </div>
          </div>

          <div className={styles.navbar}>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <FiClipboard />
              <span>Заказы</span>
            </NavLink>

            <NavLink
              to="/admin/reviews"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <FiMessageSquare />
              <span>Отзывы</span>
            </NavLink>

            <NavLink
              to="/admin/items"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <FiPackage />
              <span>Товары</span>
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              <FiGrid />
              <span>Категории</span>
            </NavLink>
          </div>

          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
