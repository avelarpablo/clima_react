import React, { useState, useEffect, Fragment } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';

function App() {

  // State para búsqueca
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  // State booleano para controlar la consulta a la API
  const [consultar, guardarConsultar] = useState(false);

  // extraer ciudad y pais
  const { ciudad, pais } = busqueda;

  // useEffect para consultar la API
  useEffect(() => {
    const consultarAPI = async () => {

      if(!consultar) return;

      const appId = 'caab06adecf5638c0c1e6f6fb28d800f';
      const url = `http://api.openweathermap.org/data/2.5/weather?`
        + `q=${ciudad},${ciudad}&appid=${appId}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      console.log(resultado);      
    }
    consultarAPI();
  }, [consultar])

  return (
    <Fragment>
      <Header
        titulo="Clima React App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              2
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
