import React, { useContext, useEffect, useState } from 'react';
import context from '../context/Context';

const INITIAL_OPTIONS_STATE = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function NumericFilter() {
  const { setSearch, filters, setFilters } = useContext(context);

  const [selectedOptions, setSelectedOptions] = useState({
    column: 'population',
    comparison: 'maior que',
    valueFilter: '0',
  });
  const [options, setOptions] = useState(INITIAL_OPTIONS_STATE);

  const handleChange = ({ target: { value, name } }) => {
    setSelectedOptions({ ...selectedOptions, [name]: value });
  };

  const onClick = () => {
    setSearch('');
    setFilters([...filters, selectedOptions]);
    setOptions(options.filter((option) => selectedOptions.column !== option));
  };

  useEffect(() => {
    setSelectedOptions((p) => ({ ...p, column: options[0] }));
  }, [options]);

  const removeFilter = (filterName) => {
    setFilters(filters.filter((filter) => filter.column !== filterName));
    setOptions((p) => [filterName, ...p]);
  };

  const removeAllFilters = () => {
    setFilters([]);
    setOptions(INITIAL_OPTIONS_STATE);
  };

  return (
    <div>
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
        <button
          type="button"
          data-testid="button-filter"
          onClick={ onClick }
          disabled={ options.length === 0 }
        >
          Filtrar
        </button>
      </div>
      <div>
        {filters.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <p>
              {`${filter.column} - ${filter.comparison} - ${filter.valueFilter} `}
              <button onClick={ () => removeFilter(filter.column) }>
                Remover
              </button>
            </p>
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          onClick={ removeAllFilters }
          data-testid="button-remove-filters"
        >
          Remover todos os filtros
        </button>
      </div>
    </div>
  );
}

export default NumericFilter;
