import React, { useContext, useState } from 'react';
import context from '../context/Context';

function NumericFilter() {
  const { planets, setPlanets } = useContext(context);
  const [filters, setFilters] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    numberValue: '0',
  });

  const handleChange = ({ target: { value, name } }) => {
    setFilters({ ...filters, [name]: value });
  };

  const onClick = () => {
    const { columnFilter, comparisonFilter, numberValue } = filters;
    console.log('click');
    setPlanets(
      planets.filter((planet) => {
        switch (comparisonFilter) {
        case 'maior que':
          return (
            planet[columnFilter] !== 'unknown'
              && Number(planet[columnFilter]) > Number(numberValue)
          );
        case 'menor que':
          return (
            planet[columnFilter] !== 'unknown'
              && Number(planet[columnFilter]) < Number(numberValue)
          );
        case 'igual a':
          return (
            planet[columnFilter] !== 'unknown'
              && Number(planet[columnFilter]) === Number(numberValue)
          );
        default:
          return false;
        }
      }),
    );
  };

  return (
    <div>
      <select
        name="columnFilter"
        data-testid="column-filter"
        defaultValue="population"
        onChange={ handleChange }
        onClick={ handleChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="comparisonFilter"
        data-testid="comparison-filter"
        defaultValue="maior que"
        onChange={ handleChange }
        onClick={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="numberValue"
        type="number"
        data-testid="value-filter"
        defaultValue="0"
        onChange={ handleChange }
      />
      <button type="button" data-testid="button-filter" onClick={ onClick }>
        Filtrar
      </button>
    </div>
  );
}

export default NumericFilter;
