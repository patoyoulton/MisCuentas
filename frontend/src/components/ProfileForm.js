import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProfileForm = ({ profileData, show, handleClose, handleProfileChange, handleUpdateProfile }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Actualizar Información Personal</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleUpdateProfile}>
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleProfileChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleProfileChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={profileData.phone}
            onChange={handleProfileChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Género</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={profileData.gender}
            onChange={handleProfileChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control
            type="date"
            name="birthday"
            value={profileData.birthday}
            onChange={handleProfileChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Imagen de Perfil</Form.Label>
          <Form.Control
            type="file"
            name="profileImage"
            onChange={handleProfileChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-block">
          Guardar Cambios
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
);

export default ProfileForm;
