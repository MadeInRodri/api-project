import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
// Importamos la función que maneja la autenticación desde el servicio
import { loginUser } from '../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    // Estado para guardar el email ingresado por el usuario
  const [email, setEmail] = useState('');
  // Estado para guardar la contraseña ingresada
  const [password, setPassword] = useState('');
  // Estado para mostrar mensajes de error o éxito
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
        // Enviamos las credenciales a la API usando el servicio loginUser
      const data = await loginUser(email, password);
      
      // Si la respuesta incluye un token, el login fue exitoso
      if (data.token) {
        // Guardamos el token y el correo en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', email);

        // Redirigir a /home
        navigate('/home');
      } else {
        setMensaje('You are not authorized');
      }
    } catch (error) {
      console.error(error);
      setMensaje('You are not authorized');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card login-card shadow p-4">
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
        {mensaje && (
          <div className="mt-3 text-center">
            <small>{mensaje}</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;