import React, { useState, useContext } from 'react';
import { ValidacionesContext } from './ValidacionesContext';

const ActualizarUsuario = ({ onUpdateUser }) => {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechanac, setFechanac] = useState('');
  const [error, setError] = useState('');

  const { regexUsuario, esMayorDeEdad, esCampoObligatorio } = useContext(ValidacionesContext);

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
      setError('El nombre de usuario debe tener al menos 6 caracteres, comenzar con una letra minúscula y contener solo letras y números.');
      return;
    }

    setError('');
    const updatedData = { usuario, nombre, apellidos, fechanac };
    onUpdateUser(updatedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Actualizar Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
      <input type="date" placeholder="Fecha Nacimiento" value={fechanac} onChange={(e) => setFechanac(e.target.value)} required />
      <button type="submit">Actualizar</button>
    </form>
  );
};

export default ActualizarUsuario;
