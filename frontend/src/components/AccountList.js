import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const AccountList = ({ accounts, handleEditAccount, handleDeleteAccount, handleShowAddAccountModal }) => (
  <div className="card mt-4">
    <div className="card-body">
      <h5 className="card-title">Configuración de Cuentas</h5>
      <Button variant="primary" onClick={handleShowAddAccountModal}>Agregar Cuenta</Button>
      <div className="mt-5">
        <h3>Cuentas Existentes</h3>
        {accounts.length === 0 ? (
          <p>No hay cuentas disponibles.</p>
        ) : (
          <ul className="list-group">
            {accounts.map(account => (
              <li key={account.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{account.name} - {account.type} - {account.bank} - ${account.initialBalance} {account.currency}</span>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEditAccount(account)}>
                      <FontAwesomeIcon icon={faEdit} /> Editar
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteAccount(account.id)}>
                      <FontAwesomeIcon icon={faTrash} /> Eliminar
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

export default AccountList;
