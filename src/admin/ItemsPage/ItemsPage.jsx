import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { FiPlus, FiPackage } from 'react-icons/fi';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import ItemModalForm from '../../components/ItemModalForm/ItemModalForm';
import ItemsTable from '../../Tables/ItemsTable/ItemsTable';
import { deleteItem, getItems } from '../../store/slices/itemsSlice';
import styles from './itemsPage.module.css';

const ItemsPage = () => {
  const { items, loading, error } = useSelector((state) => state.itemsReducer);

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditItem(null);
    setShowModal(true);
  };

  return (
    <div className={styles.itemsPage}>
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>Товары</span>
          <h2>Управление товарами</h2>
          <p>Добавляйте, редактируйте и удаляйте товары интернет-магазина.</p>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.countCard}>
            <span>Всего товаров</span>
            <strong>{items?.length || 0}</strong>
          </div>

          <button className={styles.addButton} onClick={handleAdd}>
            <FiPlus />
            <span>Добавить товар</span>
          </button>
        </div>
      </div>

      <div className={styles.tableBlock}>
        {loading ? (
          <div className={styles.center}>
            <RotatingLines strokeColor="#60a5fa" width="52" />
            <p>Загрузка товаров...</p>
          </div>
        ) : error ? (
          <div className={styles.errorBlock}>
            <h3>Ошибка загрузки</h3>
            <p>{error}</p>
          </div>
        ) : !items?.length ? (
          <div className={styles.emptyBlock}>
            <div className={styles.emptyIcon}>
              <FiPackage />
            </div>
            <h3>Товаров пока нет</h3>
            <p>Добавьте первый товар, чтобы начать наполнение магазина.</p>
          </div>
        ) : (
          <ItemsTable
            data={items}
            onEdit={handleEdit}
            onDelete={setDeleteTarget}
          />
        )}
      </div>

      <ItemModalForm
        open={showModal}
        onClose={() => {
          setEditItem(null);
          setShowModal(false);
        }}
        itemData={editItem}
      />

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
          deleteFunc={deleteItem}
          refreshFunc={getItems}
        />
      )}
    </div>
  );
};

export default ItemsPage;
