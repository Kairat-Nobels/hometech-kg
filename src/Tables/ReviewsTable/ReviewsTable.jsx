import React from 'react';
import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdDeleteOutline } from 'react-icons/md';
import styles from './reviewsTable.module.css';

const { Column, HeaderCell, Cell } = Table;

const ReviewsTable = ({ data = [], onDelete }) => {
  const renderName = (rowData) => {
    return rowData?.name ? (
      <span className={styles.nameValue}>{rowData.name}</span>
    ) : (
      <span className={styles.emptyValue}>Без имени</span>
    );
  };

  const renderPhone = (rowData) => {
    return rowData?.phone ? (
      <span className={styles.phoneValue}>{rowData.phone}</span>
    ) : (
      <span className={styles.emptyValue}>—</span>
    );
  };

  const renderComment = (rowData) => {
    return rowData?.comment ? (
      <div className={styles.commentBox}>{rowData.comment}</div>
    ) : (
      <span className={styles.emptyValue}>Нет текста отзыва</span>
    );
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
        locale={{
          emptyMessage: 'Нет отзывов',
        }}
        hover={false}
      >
        <Column width={180}>
          <HeaderCell>Имя</HeaderCell>
          <Cell>{(rowData) => renderName(rowData)}</Cell>
        </Column>

        <Column width={180}>
          <HeaderCell>Телефон</HeaderCell>
          <Cell>{(rowData) => renderPhone(rowData)}</Cell>
        </Column>

        <Column flexGrow={1.8} minWidth={320}>
          <HeaderCell>Отзыв</HeaderCell>
          <Cell>{(rowData) => renderComment(rowData)}</Cell>
        </Column>

        <Column width={110} align="center">
          <HeaderCell>Действия</HeaderCell>
          <Cell>
            {(rowData) => (
              <div className={styles.actions}>
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
    </div>
  );
};

export default ReviewsTable;
