import React from "react";
import { Modal } from "rsuite";
import { FaWhatsapp } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { useSelector } from "react-redux";
import payment from "../../../../assets/images/payment.png";
import styles from "./paymentModal.module.css";

const PaymentModal = ({ isOpen, onClose, promoApplied, discount }) => {
  const cart = useSelector((state) => state.cart.cart);

  const getTotalPrice = () =>
    cart.reduce(
      (sum, item) => sum + Math.round(item.price) * item.quantity,
      0
    );

  const discountedPrice = Math.round(
    getTotalPrice() * (1 - (discount || 0))
  );

  const orderText =
    "Здравствуйте! Пишу по поводу заказа:\n\n" +
    cart
      .map(
        (item, idx) =>
          `${idx + 1}) ${item.title} — ${item.quantity} шт. (${item.price} сом)`
      )
      .join("\n") +
    `\n\nИтого: ${discountedPrice} сом${promoApplied ? " (со скидкой)" : ""
    }`;

  const whatsappLink = `https://wa.me/996999779947?text=${encodeURIComponent(
    orderText
  )}`;

  return (
    <Modal open={isOpen} onClose={onClose} size="420px" className={styles.modalRoot}>
      <Modal.Header>
        <Modal.Title>
          <div className={styles.titleWrap}>
            <div className={styles.icon}>
              <FiCreditCard />
            </div>
            <div>
              <h3>Оплата заказа</h3>
              <p>Переведите сумму и отправьте чек</p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        <p className={styles.text}>
          Произведите оплату по реквизитам ниже и отправьте чек через WhatsApp
        </p>

        <div className={styles.imageWrap}>
          <img src={payment} alt="payment" />
        </div>

        <div className={styles.total}>
          Итого: <span>{discountedPrice} сом</span>
        </div>
      </Modal.Body>

      <Modal.Footer className={styles.footer}>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.whatsappButton}
        >
          <FaWhatsapp />
          Отправить чек
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
