// ValidacionesContext.js
import React, { createContext, useContext } from 'react';

export const ValidacionesContext = createContext();

export const ValidacionesProvider = ({ children }) => {
  
  const regexUsuario = /^[a-z][a-z0-9]{5,}$/; 
  const regexContrasena = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/; 

  
  const esMayorDeEdad = (fechaNacimiento) => {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      return edad - 1;
    }
    return edad;
  };

  
  const esCampoObligatorio = (campo) => {
    return campo.trim() === '';
  };

  return (
    <ValidacionesContext.Provider value={{ regexUsuario, regexContrasena, esMayorDeEdad, esCampoObligatorio }}>
      {children}
    </ValidacionesContext.Provider>
  );
};


export const useValidaciones = () => useContext(ValidacionesContext);
