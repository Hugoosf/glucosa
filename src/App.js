import React, { useState } from 'react';
import { ValidacionesProvider } from './ValidacionesContext';
import AltaUsuario from './AltaUsuario';
import ActualizarUsuario from './ActualizarUsuario';
import EliminarUsuario from './EliminarUsuario';
import ConsultarUsuarios from './ConsultarUsuarios';
import Lenta from './Lenta';


const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:8000/get_users.php');
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
};


const addUser = async (userData) => {
  const response = await fetch('http://localhost:8000/add_user.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  alert(data.message);
};


const updateUser = async (userData) => {
  const response = await fetch('http://localhost:8000/update_user.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  alert(data.message);
};


const deleteUser = async (usuario) => {
  const response = await fetch('http://localhost:8000/delete_user.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usuario }),
  });
  const data = await response.json();
  alert(data.message);
};

function App() {
  const [selectedAction, setSelectedAction] = useState(null);

  return (
    <ValidacionesProvider>
      <div className="App">
        <h1>Gestión de Usuarios</h1>
        <div>
          <button onClick={() => setSelectedAction('consultar')}>Consultar Usuarios</button>
          <button onClick={() => setSelectedAction('alta')}>Dar de Alta Usuario</button>
          <button onClick={() => setSelectedAction('actualizar')}>Actualizar Usuario</button>
          <button onClick={() => setSelectedAction('eliminar')}>Eliminar Usuario</button>
          <button onClick={() => setSelectedAction('lenta')}>LENTA</button>
        </div>

        {selectedAction === 'consultar' && <ConsultarUsuarios onFetchUsers={fetchUsers} />}
        {selectedAction === 'alta' && <AltaUsuario onAddUser={addUser} />}
        {selectedAction === 'actualizar' && <ActualizarUsuario onUpdateUser={updateUser} />}
        {selectedAction === 'eliminar' && <EliminarUsuario onDeleteUser={deleteUser} />}
        {selectedAction === 'lenta' && <Lenta />}
      </div>
    </ValidacionesProvider>
  );
}

export default App;
