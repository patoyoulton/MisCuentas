import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Mis Cuentas</h1>
      <p className="lead mb-4">Bienvenido a la aplicación de gestión de finanzas.</p>
      {!user ? (
        <div>
          <Link to="/login" className="btn btn-primary btn-lg mx-2">Iniciar Sesión</Link>
          <Link to="/register" className="btn btn-secondary btn-lg mx-2">Registrarse</Link>
        </div>
      ) : (
        <Link to="/dashboard" className="btn btn-primary btn-lg mx-2">Ir al Dashboard</Link>
      )}
    </div>
  );
};

export default Home;
