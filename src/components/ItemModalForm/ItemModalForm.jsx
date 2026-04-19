import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, Schema, Uploader, SelectPicker } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { FiImage, FiTag, FiType, FiFileText, FiDollarSign, FiUpload } from "react-icons/fi";
import { createItem, updateItem } from "../../store/slices/itemsSlice";
import styles from "./itemModal.module.css";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  title: StringType().isRequired("Укажите название"),
  category: StringType().isRequired("Выберите категорию"),
  content: StringType().isRequired("Укажите описание"),
  price: NumberType("Цена должна быть числом").isRequired("Укажите цену"),
});

const ItemModalForm = ({ open, onClose, itemData }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { categories } = useSelector((state) => state.categoriesReducer);

  const [formValue, setFormValue] = useState({});
  const [imgUrl, setImgUrl] = useState("");

  const isEdit = Boolean(itemData);

  useEffect(() => {
    if (itemData) {
      setFormValue({
        title: itemData.title || "",
        category: itemData.category || "",
        content: itemData.content || "",
        price: itemData.price || "",
      });
      setImgUrl(itemData.image || "");
    } else {
      setFormValue({});
      setImgUrl("");
    }
  }, [itemData, open]);

  const handleSubmit = () => {
    if (!formRef.current.check()) return;

    const payload = { ...formValue, image: imgUrl };

    if (isEdit) {
      dispatch(updateItem({ id: itemData.id, updatedData: payload }));
    } else {
      dispatch(createItem(payload));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="650px" className={styles.modalRoot}>
      <Modal.Header>
        <Modal.Title>
          <div className={styles.titleWrap}>
            <div className={styles.titleIcon}>
              <FiTag />
            </div>
            <div>
              <h3>{isEdit ? "Редактировать товар" : "Добавить товар"}</h3>
              <p>Заполните информацию о товаре</p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        {/* IMAGE */}
        <div className={styles.imageBlock}>
          {imgUrl && <img src={imgUrl} alt="preview" />}

          <Uploader
            action="https://89c8ee237c686207.mokky.dev/uploads"
            name="file"
            autoUpload
            fileListVisible={false}
            onSuccess={(res) => {
              if (res?.url) setImgUrl(res.url);
            }}
          >
            <Button className={styles.uploadBtn}>
              <FiUpload /> Загрузить фото
            </Button>
          </Uploader>

          <div className={styles.inputShell}>
            <FiImage />
            <input
              placeholder="Или вставьте ссылку на изображение"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>
        </div>

        {/* FORM */}
        <Form
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          fluid
        >
          <Form.Group>
            <label>Категория</label>
            <SelectPicker
              data={categories.map((c) => ({
                label: c.name,
                value: c.name,
              }))}
              value={formValue.category}
              onChange={(val) => setFormValue({ ...formValue, category: val })}
              className={styles.select}
              placeholder="Выберите категорию"
              searchable={false}
              block
            />
          </Form.Group>

          <Form.Group>
            <label>Название</label>
            <div className={styles.inputShell}>
              <FiType />
              <input
                value={formValue.title || ""}
                onChange={(e) =>
                  setFormValue({ ...formValue, title: e.target.value })
                }
                placeholder="Название товара"
              />
            </div>
          </Form.Group>

          <Form.Group>
            <label>Описание</label>
            <div className={styles.textareaShell}>
              <FiFileText />
              <textarea
                rows={4}
                value={formValue.content || ""}
                onChange={(e) =>
                  setFormValue({ ...formValue, content: e.target.value })
                }
                placeholder="Описание товара"
              />
            </div>
          </Form.Group>

          <Form.Group>
            <label>Цена</label>
            <div className={styles.inputShell}>
              <FiDollarSign />
              <input
                type="number"
                value={formValue.price || ""}
                onChange={(e) =>
                  setFormValue({ ...formValue, price: e.target.value })
                }
                placeholder="Цена"
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className={styles.footer}>
        <Button
          onClick={handleSubmit}
          disabled={
            !formValue.title ||
            !formValue.category ||
            !formValue.content ||
            !formValue.price
          }
          className={styles.saveButton}
        >
          {isEdit ? "Сохранить" : "Добавить"}
        </Button>

        <Button onClick={onClose} className={styles.cancelButton}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModalForm;
