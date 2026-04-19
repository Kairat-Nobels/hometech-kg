import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import RecordsTable from '../../Tables/RecordsTable/RecordsTable';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import EditOrderModal from '../../components/EditOrderModal/EditOrderModal';
import 'rsuite/dist/rsuite.min.css';
import { deleteOrder, updateOrder } from '../../store/slices/ordersSlice';
import styles from './ordersPage.module.css';

const statusList = [
  { label: "Все", value: "all" },
  { label: "Заказано", value: "Заказано" },
  { label: "Оплачено", value: "Оплачено" },
  { label: "Доставлено", value: "Доставлено" },
  { label: "Отменен", value: "Отменен" }
];

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.ordersReducer);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleEdit = (order) => {
    setEditTarget(order);
  };

  const handleEditSave = (updated) => {
    dispatch(
      updateOrder({
        id: updated.id,
        updatedData: {
          status: updated.status,
          address: updated.address
        }
      })
    );
    setEditTarget(null);
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div className={styles.ordersPage}>
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>Заказы</span>
          <h2>Управление заказами</h2>
          <p>Просмотр, фильтрация, редактирование статусов и удаление заказов.</p>
        </div>

        <div className={styles.countCard}>
          <span>Всего заказов</span>
          <strong>{orders?.length || 0}</strong>
        </div>
      </div>

      <div className={styles.filters}>
        {statusList.map((status) => (
          <button
            key={status.value}
            className={`${styles.filterButton} ${statusFilter === status.value ? styles.active : ''
              }`}
            onClick={() => setStatusFilter(status.value)}
          >
            {status.label}
          </button>
        ))}
      </div>

      <div className={styles.tableBlock}>
        {loading ? (
          <div className={styles.center}>
            <RotatingLines strokeColor="#60a5fa" width="52" />
            <p>Загрузка заказов...</p>
          </div>
        ) : error ? (
          <div className={styles.errorBlock}>
            <h3>Ошибка загрузки</h3>
            <p>{error}</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className={styles.emptyBlock}>
            <h3>Заказы не найдены</h3>
            <p>По выбранному статусу пока нет заказов.</p>
          </div>
        ) : (
          <RecordsTable
            data={filteredOrders}
            onDelete={setDeleteTarget}
            onEdit={handleEdit}
          />
        )}
      </div>

      {deleteTarget && (
        <DeleteModal
          deleteFunc={deleteOrder}
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
        />
      )}

      {editTarget && (
        <EditOrderModal
          open={!!editTarget}
          onClose={() => setEditTarget(null)}
          order={editTarget}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default OrdersPage;
