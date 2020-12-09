import React, { useState, useEffect, Fragment } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

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

  // State para manejar error 404
  const [error, guardarError] = useState(false);

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
        + `q=${ciudad},${pais}&appid=${appId}`;
      
      // Obteniendo respuesta
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      // Almacenando resultado en el state
      guardarResultado(resultado);
      
      // Restablecer state para consultar
      guardarConsultar(false);

      // Capturando error 404
      if(resultado.cod === "404") {
        guardarError(true);
      } else {
        guardarError(false);
      }
    }
    // Invocando función para consultar api
    consultarAPI();
  }, [consultar]);

  // Manejando error 404
  let componente;
  if(error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima resultado={resultado} />
  }

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
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
