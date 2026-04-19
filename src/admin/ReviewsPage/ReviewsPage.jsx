import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, deleteReview } from '../../store/slices/reviewsSlice';
import { RotatingLines } from 'react-loader-spinner';
import { FiMessageSquare } from 'react-icons/fi';
import ReviewsTable from '../../Tables/ReviewsTable/ReviewsTable';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import 'rsuite/dist/rsuite.min.css';
import styles from './reviewsPage.module.css';

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviewsReducer);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <div className={styles.reviewsPage}>
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>Отзывы</span>
          <h2>Управление отзывами</h2>
          <p>Просматривайте отзывы покупателей и удаляйте неподходящие записи.</p>
        </div>

        <div className={styles.countCard}>
          <span>Всего отзывов</span>
          <strong>{reviews?.length || 0}</strong>
        </div>
      </div>

      <div className={styles.tableBlock}>
        {loading ? (
          <div className={styles.center}>
            <RotatingLines strokeColor="#60a5fa" width="52" />
            <p>Загрузка отзывов...</p>
          </div>
        ) : error ? (
          <div className={styles.errorBlock}>
            <h3>Ошибка загрузки</h3>
            <p>{error}</p>
          </div>
        ) : !reviews?.length ? (
          <div className={styles.emptyBlock}>
            <div className={styles.emptyIcon}>
              <FiMessageSquare />
            </div>
            <h3>Отзывов пока нет</h3>
            <p>Когда покупатели начнут оставлять отзывы, они появятся здесь.</p>
          </div>
        ) : (
          <ReviewsTable
            data={reviews}
            onDelete={(review) => setDeleteTarget(review)}
          />
        )}
      </div>

      {deleteTarget && (
        <DeleteModal
          deleteFunc={deleteReview}
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
        />
      )}
    </div>
  );
};

export default ReviewsPage;
