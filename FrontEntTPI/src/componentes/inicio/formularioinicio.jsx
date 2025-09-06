// InicioSesion.js
import React, { useState } from 'react';
import axios from 'axios';
import './formulario.css';

const InicioSesion = () => {
  const [user, setuser] = useState('');
  const [pass, setpass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  
    setError('');

    if (!user || !pass) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      const respuesta = await axios.post('http://localhost:3000/api/usuarios/login', {
        user,
        pass
      });

      console.log('Inicio de sesión exitoso', respuesta.data);

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
            value={user}
            onChange={(e) => setuser(e.target.value)}
          />
          <label>Nombre de Usuario</label>
        </div>
        
        <div className="user-box">
          <input 
            type="password" 
            required 
            value={pass}
            onChange={(e) => setpass(e.target.value)}
          />
          <label>pass</label>
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