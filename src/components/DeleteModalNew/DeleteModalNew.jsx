import React from 'react';
import { Modal, Button } from 'rsuite';
import { useDispatch } from 'react-redux';
import { FiTrash2, FiAlertTriangle } from 'react-icons/fi';
import styles from './deleteModal.module.css';

const DeleteModal = ({ deleteFunc, open, onClose, id }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFunc(id));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="420px" className={styles.modalRoot}>
      <Modal.Header>
        <Modal.Title>
          <div className={styles.titleWrap}>
            <div className={styles.icon}>
              <FiAlertTriangle />
            </div>
            <div>
              <h3>Удаление</h3>
              <p>Это действие нельзя отменить</p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        <p>Вы уверены, что хотите удалить эту запись?</p>
      </Modal.Body>

      <Modal.Footer className={styles.footer}>
        <Button onClick={handleDelete} className={styles.deleteButton}>
          <FiTrash2 /> Удалить
        </Button>

        <Button onClick={onClose} className={styles.cancelButton}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
