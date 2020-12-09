import React, { useState, useEffect, Fragment } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

function App() {

  // State para búsqueca
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  // State booleano para controlar la consulta a la API
  const [consultar, guardarConsultar] = useState(false);

  // State para el resultado de la API
  const [resultado, guardarResultado] = useState({});

  // extraer ciudad y pais
  const { ciudad, pais } = busqueda;

  // useEffect para consultar la API
  useEffect(() => {
    const consultarAPI = async () => {
      // Consultar cuando sea true
      if(!consultar) return;

      // Flujo normal

      // Formateando url
      const appId = 'caab06adecf5638c0c1e6f6fb28d800f';
      const url = `http://api.openweathermap.org/data/2.5/weather?`
        + `q=${ciudad},${ciudad}&appid=${appId}`;
      
      // Obteniendo respuesta
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      // Almacenando resultado en el state
      guardarResultado(resultado);
      
      // Restablecer state para consultar
      guardarConsultar(false);
    }

    // Invocando función para consultar api
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
              <Clima
                resultado={resultado}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
