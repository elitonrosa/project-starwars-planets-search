import React, { useContext, useState } from 'react';

import context from '../context/Context';
import { COLUMN_OPTIONS } from '../services/constTypes';

function OrderFilter() {
  const { setOrder } = useContext(context);

  const [localStateOrder, setLocalStateOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleChange = ({ target: { name, value } }) => {
    setLocalStateOrder({ ...localStateOrder, [name]: value });
  };

  const onClickOrder = () => {
    setOrder(localStateOrder);
  };

  return (
    <div>
      <select
        name="column"
        onChange={ handleChange }
        onClick={ handleChange }
        data-testid="column-sort"
      >
        {COLUMN_OPTIONS.map((option) => (
          <option key={ option } value={ option }>
            {option}
          </option>
        ))}
      </select>
      <div>
        <label htmlFor="sortColumnAsc">
          <input
            type="radio"
            name="sort"
            id="sortColumnAsc"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handleChange }
          />
          Ascendente
        </label>
        <label htmlFor="sortColumnDesc">
          <input
            type="radio"
            name="sort"
            id="sortColumnDesc"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ handleChange }
          />
          Descendente
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ onClickOrder }
      >
        Ordenar
      </button>
    </div>
  );
}

export default OrderFilter;
