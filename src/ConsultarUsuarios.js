// ConsultarUsuarios.js
import React, { useState, useEffect } from 'react';

const ConsultarUsuarios = ({ onFetchUsers }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Al cargar el componente, obtenemos los usuarios
    const fetchUsuarios = async () => {
      const fetchedUsuarios = await onFetchUsers();
      setUsuarios(fetchedUsuarios);
    };
    
    fetchUsuarios();
  }, [onFetchUsers]);

  return (
    <div>
      <h2>Usuarios Registrados</h2>
      {usuarios.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Fecha de Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.usuario}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellidos}</td>
                <td>{usuario.fechanac}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay usuarios disponibles.</p>
      )}
    </div>
  );
};

export default ConsultarUsuarios;
