import React, { useContext } from 'react';
import context from '../context/Context';

function Table() {
  const { planets } = useContext(context);

  return (
    <table>
      <thead>
        <tr>
          {planets.length !== 0
            && Object.keys(planets[0]).map((data) => <th key={ data }>{data}</th>)}
        </tr>
      </thead>
      <tbody>
        {planets.length !== 0 && planets.map((planet) => (
          <tr key={ planet.name }>
            {Object.keys(planet).map((key) => <td key={ key }>{planet[key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
