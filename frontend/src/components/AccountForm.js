import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AccountForm = ({ show, handleClose, accountData, handleAccountChange, handleSubmit }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{accountData.id ? 'Editar Cuenta' : 'Agregar Cuenta'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nombre de la Cuenta</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={accountData.name || ''}
            onChange={handleAccountChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tipo de Cuenta</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={accountData.type || ''}
            onChange={handleAccountChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Saldo Inicial</Form.Label>
          <Form.Control
            type="number"
            name="initialBalance"
            value={accountData.initialBalance || ''}
            onChange={handleAccountChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Moneda</Form.Label>
          <Form.Control
            as="select"
            name="currency"
            value={accountData.currency || ''}
            onChange={handleAccountChange}
            required
          >
            <option value="CLP">CLP</option>
            <option value="USD">USD</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Banco</Form.Label>
          <Form.Control
            type="text"
            name="bank"
            value={accountData.bank || ''}
            onChange={handleAccountChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-block mt-3">
          {accountData.id ? 'Actualizar Cuenta' : 'Agregar Cuenta'}
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
);

export default AccountForm;
