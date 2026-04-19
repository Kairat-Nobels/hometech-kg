import React from 'react';
import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import styles from './recordsTable.module.css';

const { Column, HeaderCell, Cell } = Table;

const RecordsTable = ({ data = [], loading, error, onDelete, onEdit }) => {
  const renderOrderItems = (rowData) => {
    if (!Array.isArray(rowData?.order) || rowData.order.length === 0) {
      return <span className={styles.emptyValue}>Нет данных</span>;
    }

    return (
      <div className={styles.orderList}>
        {rowData.order.map((item, idx) => (
          <div key={`${item?.id || idx}-${idx}`} className={styles.orderItem}>
            <span className={styles.orderItemTitle}>
              {item?.title || 'Без названия'}
            </span>
            <span className={styles.orderItemMeta}>
              {item?.quantity || 0} шт. · {item?.price || 0} сом
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderStatus = (status) => {
    const normalized = status || 'Не указан';

    let statusClass = styles.statusDefault;

    if (normalized === 'Заказано') statusClass = styles.statusOrdered;
    if (normalized === 'Оплачено') statusClass = styles.statusPaid;
    if (normalized === 'Доставлено') statusClass = styles.statusDelivered;
    if (normalized === 'Отменен') statusClass = styles.statusCanceled;

    return <span className={`${styles.statusBadge} ${statusClass}`}>{normalized}</span>;
  };

  const renderDate = (date) => {
    if (!date) return <span className={styles.emptyValue}>—</span>;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return <span className={styles.emptyValue}>—</span>;
    }

    return parsedDate.toLocaleDateString('ru-RU');
  };

  const renderAmount = (amount) => {
    if (amount === undefined || amount === null) {
      return <span className={styles.emptyValue}>—</span>;
    }

    return <span className={styles.amountValue}>{amount} сом</span>;
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
        locale={{ emptyMessage: 'Заказов нет' }}
        loading={loading}
        hover={false}
      >
        <Column width={70} align="center">
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column flexGrow={2.2} minWidth={280}>
          <HeaderCell>Товары</HeaderCell>
          <Cell>{(rowData) => renderOrderItems(rowData)}</Cell>
        </Column>

        <Column width={120}>
          <HeaderCell>Дата</HeaderCell>
          <Cell>{(rowData) => renderDate(rowData?.date)}</Cell>
        </Column>

        <Column width={140}>
          <HeaderCell>Имя</HeaderCell>
          <Cell>
            {(rowData) => rowData?.name || <span className={styles.emptyValue}>—</span>}
          </Cell>
        </Column>

        <Column width={140}>
          <HeaderCell>Телефон</HeaderCell>
          <Cell>
            {(rowData) => rowData?.phone || <span className={styles.emptyValue}>—</span>}
          </Cell>
        </Column>

        <Column width={180}>
          <HeaderCell>Адрес</HeaderCell>
          <Cell>
            {(rowData) =>
              rowData?.address ? (
                <span className={styles.addressValue}>{rowData.address}</span>
              ) : (
                <span className={styles.emptyValue}>Самовывоз</span>
              )
            }
          </Cell>
        </Column>

        <Column width={130}>
          <HeaderCell>Сумма</HeaderCell>
          <Cell>{(rowData) => renderAmount(rowData?.amount)}</Cell>
        </Column>

        <Column width={140}>
          <HeaderCell>Статус</HeaderCell>
          <Cell>{(rowData) => renderStatus(rowData?.status)}</Cell>
        </Column>

        <Column width={120} align="center">
          <HeaderCell>Действия</HeaderCell>
          <Cell>
            {(rowData) => (
              <div className={styles.actions}>
                <Whisper
                  trigger="hover"
                  placement="top"
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
                  trigger="hover"
                  placement="top"
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

      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};

export default RecordsTable;
