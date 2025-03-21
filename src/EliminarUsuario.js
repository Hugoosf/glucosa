// EliminarUsuario.js
import React, { useState } from 'react';

const EliminarUsuario = ({ onDeleteUser }) => {
  const [usuario, setUsuario] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que el nombre de usuario no esté vacío
    if (!usuario) {
      setError('El nombre de usuario es obligatorio.');
      return;
    }

    // Si no hay error, eliminar el usuario
    setError('');
    onDeleteUser(usuario);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Eliminar Usuario</h2>
      <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Eliminar</button>
    </form>
  );
};

export default EliminarUsuario;
