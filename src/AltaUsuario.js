import React, { useState, useContext } from 'react';
import { ValidacionesContext } from './ValidacionesContext';

const AltaUsuario = ({ onAddUser }) => {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechanac, setFechanac] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const { regexUsuario, regexContrasena, esMayorDeEdad, esCampoObligatorio } = useContext(ValidacionesContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (esCampoObligatorio(nombre)) {
      setError('El nombre es obligatorio.');
      return;
    }
    if (esCampoObligatorio(apellidos)) {
      setError('Los apellidos son obligatorios.');
      return;
    }

    
    if (esMayorDeEdad(fechanac) < 18) {
      setError('El usuario debe ser mayor de 18 años.');
      return;
    }

    
    const isUsuarioValido = regexUsuario.test(usuario);
    if (!isUsuarioValido) {
      setError('El nombre de usuario debe tener al menos 6 caracteres, comenzar con una letra y contener solo letras y números.');
      return;
    }

    
    const isContrasenaValida = regexContrasena.test(contrasena);
    if (!isContrasenaValida) {
      setError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.');
      return;
    }

    setError('');
    const userData = { usuario, nombre, apellidos, fechanac, contrasena };
    onAddUser(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Alta Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
      <input type="date" placeholder="Fecha Nacimiento" value={fechanac} onChange={(e) => setFechanac(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
      <button type="submit">Agregar Usuario</button>
    </form>
  );
};

export default AltaUsuario;
