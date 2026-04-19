import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'rsuite';
import { useDispatch } from 'react-redux';
import { FiGrid, FiFileText, FiFolderPlus, FiEdit3 } from 'react-icons/fi';
import { createCategories, updateCategories } from '../../store/slices/categoriesSlice';
import styles from './categoriesModal.module.css';

const emptyCategory = {
  name: '',
  description: ''
};

const CategoriesModal = ({ open, onClose, categoryData }) => {
  const isEdit = Boolean(categoryData);
  const [formValue, setFormValue] = useState(emptyCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      setFormValue({
        name: categoryData?.name || '',
        description: categoryData?.description || ''
      });
    } else {
      setFormValue(emptyCategory);
    }
  }, [categoryData, isEdit, open]);

  const handleChange = (value, key) => {
    setFormValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!formValue.name || !formValue.description) return;

    if (isEdit) {
      dispatch(updateCategories({ id: categoryData.id, news: formValue }));
    } else {
      dispatch(createCategories(formValue));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="500px" className={styles.modalRoot}>
      <Modal.Header className={styles.header}>
        <Modal.Title>
          <div className={styles.titleWrap}>
            <div className={styles.titleIcon}>
              {isEdit ? <FiEdit3 /> : <FiFolderPlus />}
            </div>
            <div>
              <h3>{isEdit ? 'Редактировать категорию' : 'Добавить категорию'}</h3>
              <p>
                {isEdit
                  ? 'Измените данные выбранной категории.'
                  : 'Заполните форму для создания новой категории.'}
              </p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        <div className={styles.form}>
          <div className={styles.field}>
            <label>Название</label>
            <div className={styles.inputShell}>
              <FiGrid />
              <input
                type="text"
                value={formValue.name}
                onChange={(e) => handleChange(e.target.value, 'name')}
                placeholder="Название категории"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Описание</label>
            <div className={styles.textareaShell}>
              <FiFileText className={styles.textareaIcon} />
              <textarea
                rows={5}
                value={formValue.description}
                onChange={(e) => handleChange(e.target.value, 'description')}
                placeholder="Описание категории"
              />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className={styles.footer}>
        <Button
          appearance="primary"
          onClick={handleSubmit}
          disabled={!formValue.name || !formValue.description}
          className={styles.saveButton}
        >
          Сохранить
        </Button>

        <Button onClick={onClose} appearance="subtle" className={styles.cancelButton}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoriesModal;
