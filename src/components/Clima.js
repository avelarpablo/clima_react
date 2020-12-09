import React from 'react';
import { obtenerCentigrados } from '../helpers';

const Clima = ({ resultado }) => {

  // Extrayendo valores del resultado
  const { name, main } = resultado;

  // Mostrar componente solo si se ha hecho la consulta
  if(!name) return null;

  return (
    <div className="card-panel white col s12">
      <div className="black-text">
        <h2>El clima de {name} es: </h2>

        <p className="temperatura">
          {obtenerCentigrados(main.temp)}  <span> &#x2103; </span>
        </p>

        <p>Temperatura Máxima:&nbsp;
          {obtenerCentigrados(main.temp_max)} <span> &#x2103; </span>
        </p>

        <p>Temperatura Mínima:&nbsp;
          {obtenerCentigrados(main.temp_min)} <span> &#x2103; </span>
        </p>
      </div>
    </div>
  );
}
 
export default Clima;