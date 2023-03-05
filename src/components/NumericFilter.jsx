import React, { useContext, useEffect, useState } from 'react';

import context from '../context/Context';
import { COLUMN_OPTIONS } from '../services/constTypes';
import styles from '../styles/NumericFilter.module.sass';

function NumericFilter() {
  const { setSearch, filters, setFilters, options, setOptions } = useContext(context);

  const [selectedOptions, setSelectedOptions] = useState({
    column: 'population',
    comparison: 'maior que',
    valueFilter: '0',
  });

  const handleChange = ({ target: { value, name } }) => {
    setSelectedOptions({ ...selectedOptions, [name]: value });
  };

  const addFilter = () => {
    setSearch('');
    setFilters([...filters, selectedOptions]);
    setOptions(options.filter((option) => selectedOptions.column !== option));
  };

  const removeAllFilters = () => {
    setFilters([]);
    setOptions(COLUMN_OPTIONS);
  };

  useEffect(() => {
    setSelectedOptions((p) => ({ ...p, column: options[0] }));
  }, [options]);

  return (
    <div className={ styles.numericFiltersContainer }>
      <label htmlFor="column">
        <p>Coluna</p>
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
      </label>
      <label htmlFor="comparison">
        <p>Operador</p>
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
      </label>
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
        onClick={ addFilter }
        disabled={ options.length === 0 }
      >
        Filtrar
      </button>
      <button
        type="button"
        onClick={ removeAllFilters }
        data-testid="button-remove-filters"
      >
        Limpar Filtros
      </button>
    </div>
  );
}

export default NumericFilter;
