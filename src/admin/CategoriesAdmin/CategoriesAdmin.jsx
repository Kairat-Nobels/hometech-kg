import { useEffect, useState } from 'react';
import { Button, Table, Whisper, Tooltip } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import { FiGrid, FiPlus } from 'react-icons/fi';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import CategoriesModal from '../../components/CategoriesModal/CategoriesModal';
import { deleteCategories, getCategories } from '../../store/slices/categoriesSlice';
import styles from './categoriesAdmin.module.css';

const { Column, HeaderCell, Cell } = Table;

const CategoriesAdmin = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categoriesReducer);

  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleEdit = (category) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditCategory(null);
    setShowModal(true);
  };

  const renderName = (rowData) => {
    return rowData?.name ? (
      <span className={styles.nameBadge}>{rowData.name}</span>
    ) : (
      <span className={styles.emptyValue}>Без названия</span>
    );
  };

  const renderDescription = (rowData) => {
    return rowData?.description ? (
      <div className={styles.descriptionBox}>{rowData.description}</div>
    ) : (
      <span className={styles.emptyValue}>Нет описания</span>
    );
  };

  return (
    <div className={styles.categoriesPage}>
      <div className={styles.header}>
        <div>
          <span className={styles.badge}>Категории</span>
          <h2>Управление категориями</h2>
          <p>Добавляйте, редактируйте и удаляйте категории товаров магазина.</p>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.countCard}>
            <span>Всего категорий</span>
            <strong>{categories?.length || 0}</strong>
          </div>

          <button className={styles.addButton} onClick={handleAdd}>
            <FiPlus />
            <span>Добавить категорию</span>
          </button>
        </div>
      </div>

      <div className={styles.tableBlock}>
        {loading ? (
          <div className={styles.center}>
            <RotatingLines strokeColor="#60a5fa" width="52" />
            <p>Загрузка категорий...</p>
          </div>
        ) : error ? (
          <div className={styles.errorBlock}>
            <h3>Ошибка загрузки</h3>
            <p>{error}</p>
          </div>
        ) : !categories?.length ? (
          <div className={styles.emptyBlock}>
            <div className={styles.emptyIcon}>
              <FiGrid />
            </div>
            <h3>Категорий пока нет</h3>
            <p>Добавьте первую категорию для структуры каталога.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <Table
              className={styles.table}
              bordered
              cellBordered
              data={categories}
              autoHeight
              wordWrap="break-word"
              locale={{ emptyMessage: 'Категорий нет' }}
              hover={false}
            >
              <Column width={70} align="center">
                <HeaderCell>ID</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column width={240}>
                <HeaderCell>Название</HeaderCell>
                <Cell>{(rowData) => renderName(rowData)}</Cell>
              </Column>

              <Column flexGrow={1} minWidth={320}>
                <HeaderCell>Описание</HeaderCell>
                <Cell>{(rowData) => renderDescription(rowData)}</Cell>
              </Column>

              <Column width={120} align="center">
                <HeaderCell>Действия</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <div className={styles.actions}>
                      <Whisper
                        placement="top"
                        trigger="hover"
                        speaker={<Tooltip>Редактировать</Tooltip>}
                      >
                        <Button
                          onClick={() => handleEdit(rowData)}
                          appearance="subtle"
                          className={styles.actionButton}
                        >
                          <MdEdit className={styles.editIcon} />
                        </Button>
                      </Whisper>

                      <Whisper
                        placement="top"
                        trigger="hover"
                        speaker={<Tooltip>Удалить</Tooltip>}
                      >
                        <Button
                          onClick={() => setDeleteTarget(rowData)}
                          appearance="subtle"
                          className={styles.actionButton}
                        >
                          <MdDeleteOutline className={styles.deleteIcon} />
                        </Button>
                      </Whisper>
                    </div>
                  )}
                </Cell>
              </Column>
            </Table>
          </div>
        )}
      </div>

      <CategoriesModal
        open={showModal}
        onClose={() => {
          setEditCategory(null);
          setShowModal(false);
        }}
        categoryData={editCategory}
      />

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
          deleteFunc={deleteCategories}
          refreshFunc={getCategories}
        />
      )}
    </div>
  );
};

export default CategoriesAdmin;
