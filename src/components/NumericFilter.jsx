import React, { useContext, useState } from 'react';
import context from '../context/Context';

function NumericFilter() {
  const { filters, setFilters } = useContext(context);

  const [selectedOptions, setSelectedOptions] = useState({
    column: 'population',
    comparison: 'maior que',
    valueFilter: '0',
  });
  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const handleChange = ({ target: { value, name } }) => {
    setSelectedOptions({ ...selectedOptions, [name]: value });
  };

  const onClick = () => {
    setFilters([...filters, selectedOptions]);
    setOptions(options.filter((option) => selectedOptions.column !== option));
  };

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        defaultValue={ options.length !== 0 ? options[0] : '' }
        onChange={ handleChange }
        onClick={ handleChange }
      >
        {options.map((option) => (
          <option key={ option } value={ option }>
            {option}
          </option>
        ))}
      </select>
      <select
        name="comparison"
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
        name="valueFilter"
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
