import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(username, password, email);
      history.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registrarse</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Nombre de Usuario</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-secondary btn-block mt-3">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
