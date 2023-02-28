import React, { useContext } from 'react';
import context from '../context/Context';

function NumericFilter() {
  const {
    filters,
    setFilters,
    filterByNameAndColumn,
    setFilteredPlanets,
  } = useContext(context);

  const handleChange = ({ target: { value, name } }) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <select
        name="columnFilter"
        data-testid="column-filter"
        defaultValue="population"
        onChange={ handleChange }
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
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="numberValue"
        type="number"
        data-testid="value-filter"
        onChange={ handleChange }
        defaultValue="0"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => setFilteredPlanets(filterByNameAndColumn()) }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumericFilter;
