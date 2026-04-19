import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import styles from './itemsTable.module.css';

const { Column, HeaderCell, Cell } = Table;

const ItemsTable = ({ data = [], onEdit, onDelete }) => {
  const renderImage = (rowData) => {
    if (!rowData?.image) {
      return <span className={styles.emptyValue}>Нет фото</span>;
    }

    return (
      <div className={styles.imageWrap}>
        <img src={rowData.image} alt={rowData.title || 'Фото товара'} />
      </div>
    );
  };

  const renderCategory = (rowData) => {
    if (!rowData?.category) {
      return <span className={styles.emptyValue}>Без категории</span>;
    }

    return <span className={styles.categoryBadge}>{rowData.category}</span>;
  };

  const renderTitle = (rowData) => {
    return rowData?.title ? (
      <span className={styles.titleValue}>{rowData.title}</span>
    ) : (
      <span className={styles.emptyValue}>Без названия</span>
    );
  };

  const renderContent = (rowData) => {
    return rowData?.content ? (
      <span className={styles.contentValue}>{rowData.content}</span>
    ) : (
      <span className={styles.emptyValue}>Нет описания</span>
    );
  };

  const renderPrice = (rowData) => {
    if (rowData?.price === undefined || rowData?.price === null) {
      return <span className={styles.emptyValue}>—</span>;
    }

    return <span className={styles.priceValue}>{rowData.price} сом</span>;
  };

  return (
    <div className={styles.tableWrapper}>
      <Table
        className={styles.table}
        bordered
        cellBordered
        data={Array.isArray(data) ? data : []}
        autoHeight
        wordWrap="break-word"
        locale={{ emptyMessage: 'Товаров нет' }}
        hover={false}
      >
        <Column width={70} align="center" >
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={140}>
          <HeaderCell>Фото</HeaderCell>
          <Cell>{(rowData) => renderImage(rowData)}</Cell>
        </Column>

        <Column width={180}>
          <HeaderCell>Категория</HeaderCell>
          <Cell>{(rowData) => renderCategory(rowData)}</Cell>
        </Column>

        <Column flexGrow={1.5} minWidth={220}>
          <HeaderCell>Название</HeaderCell>
          <Cell>{(rowData) => renderTitle(rowData)}</Cell>
        </Column>

        <Column flexGrow={2.2} minWidth={260}>
          <HeaderCell>Описание</HeaderCell>
          <Cell>{(rowData) => renderContent(rowData)}</Cell>
        </Column>

        <Column width={130}>
          <HeaderCell>Цена</HeaderCell>
          <Cell>{(rowData) => renderPrice(rowData)}</Cell>
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
                    onClick={() => onEdit && onEdit(rowData)}
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
                    onClick={() => onDelete && onDelete(rowData)}
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
  );
};

export default ItemsTable;
