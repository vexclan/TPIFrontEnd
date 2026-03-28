import React, { useState } from 'react';
import axios from 'axios';
import './registro.css'

const Registro = () => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [repetirContrasena, setRepetirContrasena] = useState('');

  // Estados para manejar errores
  const [errores, setErrores] = useState({});

  // Función para validar el formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validación de nombre
    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    // Validación de DNI
    if (!dni.trim()) {
      nuevosErrores.dni = 'El DNI es obligatorio';
    } else if (!/^\d{8}$/.test(dni)) {
      nuevosErrores.dni = 'El DNI debe tener 8 dígitos';
    }

    // Validación de correo
    if (!correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      nuevosErrores.correo = 'El correo no es válido';
    }

    // Validación de contraseña
    if (!contrasena.trim()) {
      nuevosErrores.contrasena = 'La contraseña es obligatoria';
    } else if (contrasena.length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validación de repetir contraseña
    if (!repetirContrasena.trim()) {
      nuevosErrores.repetirContrasena = 'Debe repetir la contraseña';
    } else if (contrasena !== repetirContrasena) {
      nuevosErrores.repetirContrasena = 'Las contraseñas no coinciden';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    if (validarFormulario()) {
      try {
        // Solicitud de registro usando fetch nativo
        const respuesta = await fetch('/api/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre,
            dni,
            correo,
            contrasena
          })
        });

        // Verificar si la respuesta es exitosa
        if (respuesta.ok) {
          const datos = await respuesta.json();
          alert('Registro exitoso');
          console.log(datos);
        } else {
          // Manejar errores de respuesta
          const errorDatos = await respuesta.json();
          alert(errorDatos.mensaje || 'Hubo un problema con el registro');
        }
      } catch (error) {
        // Manejar errores de red
        console.error('Error en el registro:', error);
        alert('No se pudo completar el registro. Verifique su conexión.');
      }
    }
  };

  return (
    <div className="login-box">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label>Nombre</label>
          {errores.nombre && <p className="error-message">{errores.nombre}</p>}
        </div>

        <div className="user-box">
          <input
            type="text"
            required
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <label>DNI</label>
          {errores.dni && <p className="error-message">{errores.dni}</p>}
        </div>

        <div className="user-box">
          <input
            type="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <label>Correo Electrónico</label>
          {errores.correo && <p className="error-message">{errores.correo}</p>}
        </div>

        <div className="user-box">
          <input
            type="password"
            required
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <label>Contraseña</label>
          {errores.contrasena && <p className="error-message">{errores.contrasena}</p>}
        </div>

        <div className="user-box">
          <input
            type="password"
            required
            value={repetirContrasena}
            onChange={(e) => setRepetirContrasena(e.target.value)}
          />
          <label>Repetir Contraseña</label>
          {errores.repetirContrasena && <p className="error-message">{errores.repetirContrasena}</p>}
        </div>

        <a href="#" onClick={handleSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Registrarse
        </a>
      </form>
    </div>
  );
};

export default Registro;