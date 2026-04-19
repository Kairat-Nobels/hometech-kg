import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'rsuite';
import { FiMapPin, FiPackage, FiSave } from 'react-icons/fi';
import styles from './editOrderModal.module.css';

const statusOptions = [
  "Заказано",
  "Оплачено",
  "Доставлено",
  "Отменен"
];

const EditOrderModal = ({ open, onClose, order, onSave }) => {
  const [status, setStatus] = useState(order?.status || "Заказано");
  const [address, setAddress] = useState(order?.address || "");

  useEffect(() => {
    setStatus(order?.status || "Заказано");
    setAddress(order?.address || "");
  }, [order, open]);

  const handleSave = () => {
    onSave({ ...order, status, address });
  };

  if (!order) return null;

  return (
    <Modal open={open} onClose={onClose} size="500px" className={styles.modalRoot}>
      <Modal.Header>
        <Modal.Title>
          <div className={styles.titleWrap}>
            <div className={styles.titleIcon}>
              <FiPackage />
            </div>
            <div>
              <h3>Редактировать заказ #{order.id}</h3>
              <p>Измените статус заказа и адрес доставки</p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        <div className={styles.formGroup}>
          <label>Статус</label>
          <div className={styles.selectShell}>
            <FiPackage />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Адрес</label>
          <div className={styles.inputShell}>
            <FiMapPin />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Введите адрес доставки"
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className={styles.footer}>
        <Button onClick={handleSave} className={styles.saveButton}>
          <FiSave />
          Сохранить
        </Button>
        <Button onClick={onClose} className={styles.cancelButton}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditOrderModal;
