import React, { useContext } from 'react';
import context from '../context/Context';

function Table() {
  const { filteredPlanets, isLoading } = useContext(context);

  return (
    <div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              {filteredPlanets.length !== 0
                && Object.keys(filteredPlanets[0]).map((data) => (
                  <th key={ data }>{data}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {filteredPlanets.length !== 0
              && filteredPlanets.map((planet) => (
                <tr key={ planet.name }>
                  {Object.keys(planet).map((key) => (
                    <td key={ key }>{planet[key]}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
