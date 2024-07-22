import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatAmount } from '../utils/formatAmount';

const TransactionTable = ({ transactions, accounts, handleEditTransaction, handleDeleteTransaction }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Fecha</th>
        <th>Nota</th>
        <th>Tipo</th>
        <th>Categoría</th>
        <th>Monto</th>
        <th>Cuenta</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(transaction => (
        <tr key={transaction.id}>
          <td>{transaction.date}</td>
          <td>{transaction.note}</td>
          <td>{transaction.type}</td>
          <td>{transaction.category}</td>
          <td className={transaction.type === 'expense' ? 'text-danger' : 'text-success'}>
            {transaction.type === 'expense' ? `-$${formatAmount(transaction.amount)}` : `+$${formatAmount(transaction.amount)}`}
          </td>
          <td>{accounts.find(acc => acc.id === transaction.accountId)?.name}</td>
          <td>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <FontAwesomeIcon icon={faEllipsisV} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleEditTransaction(transaction)}>
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDeleteTransaction(transaction.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Eliminar
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TransactionTable;
