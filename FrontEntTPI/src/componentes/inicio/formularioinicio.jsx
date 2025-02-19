// InicioSesion.js
import React, { useState } from 'react';
import axios from 'axios';
import './formulario.css';

const InicioSesion = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');

    // Basic validation
    if (!nombreUsuario || !contraseña) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      // Replace with your actual login endpoint
      const respuesta = await axios.post('/api/iniciar-sesion', {
        nombreUsuario,
        contraseña
      });

      // Handle successful login
      console.log('Inicio de sesión exitoso', respuesta.data);
      // Here you might redirect or update app state
    } catch (err) {
      setError(err.response?.data?.message || 'Inicio de sesión fallido');
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</div>}
        
        <div className="user-box">
          <input 
            type="text" 
            required 
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
          <label>Nombre de Usuario</label>
        </div>
        
        <div className="user-box">
          <input 
            type="password" 
            required 
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <label>Contraseña</label>
        </div>

        <a href="#" onClick={handleSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Confirmar
        </a>
      </form>
    </div>
  );
};

export default InicioSesion;