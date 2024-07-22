import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      if (response.auth) {
        login(response.user, response.token);
        history.push('/dashboard');
      } else {
        console.error('Login failed: ', response.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Nombre de Usuario</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-3">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
