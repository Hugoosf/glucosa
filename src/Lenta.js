import React, { useState } from 'react';

const Lenta = () => {
  const [nombre, setNombre] = useState('');
  const [mes, setMes] = useState('01'); 
  const [valorLenta, setValorLenta] = useState(null);
  const [error, setError] = useState('');

  
  const obtenerIdUsuario = async (nombreUsuario) => {
    try {
      const response = await fetch('http://localhost:8000/get_id_usuario.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario: nombreUsuario }),
      });
      const data = await response.json();
      return data.idusuario;
    } catch (error) {
      console.error("Error al obtener el ID del usuario:", error);
      return null;
    }
  };

  
  const obtenerValorLenta = async (idUsuario, mes, tipoConsulta) => {
    try {
      const response = await fetch('http://localhost:8000/consulta_lenta.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idusuario: idUsuario, mes, tipoConsulta }),
      });
      const data = await response.json();
      if (data.resultado) {
        setValorLenta(data.resultado);
      } else {
        setValorLenta('No se encontraron resultados.');
      }
    } catch (error) {
      console.error("Error al obtener los valores de Lenta:", error);
      setValorLenta('Error en la consulta');
    }
  };

  const handleConsulta = async (tipoConsulta) => {
    if (!nombre || !mes) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    
    const idUsuario = await obtenerIdUsuario(nombre);
   
    if (idUsuario) {
      
      await obtenerValorLenta(idUsuario, mes, tipoConsulta);
    } else {
      setError('No se encontró un usuario con ese nombre.');
    }
  };

  return (
    <div>
      <h2>Consulta de Lenta</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Nombre del Usuario"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <select value={mes} onChange={(e) => setMes(e.target.value)}>
        <option value="01">Enero</option>
        <option value="02">Febrero</option>
        <option value="03">Marzo</option>
        <option value="04">Abril</option>
        <option value="05">Mayo</option>
        <option value="06">Junio</option>
        <option value="07">Julio</option>
        <option value="08">Agosto</option>
        <option value="09">Septiembre</option>
        <option value="10">Octubre</option>
        <option value="11">Noviembre</option>
        <option value="12">Diciembre</option>
      </select>
      <div>
        <button onClick={() => handleConsulta('media')}>Valores medios</button>
        <button onClick={() => handleConsulta('minimo')}>Valor mínimo</button>
        <button onClick={() => handleConsulta('maximo')}>Valor máximo</button>
      </div>

      {valorLenta && (
        <div>
          <h3>Resultado: {valorLenta}</h3>
        </div>
      )}
    </div>
  );
};

export default Lenta;
