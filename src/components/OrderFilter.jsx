import React, { useContext, useState } from 'react';

import context from '../context/Context';
import { COLUMN_OPTIONS } from '../services/constTypes';

import styles from '../styles/OrderFilter.module.sass';

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
    <div className={ styles.orderFilterContainer }>
      <div className={ styles.selectorsContainer }>
        <label htmlFor="column">
          <p>Ordenar</p>
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
        </label>
        <div className={ styles.radioInputs }>
          <label htmlFor="sortColumnAsc">
            <input
              type="radio"
              name="sort"
              id="sortColumnAsc"
              value="ASC"
              data-testid="column-sort-input-asc"
              onChange={ handleChange }
            />
            <span>Ascendente</span>
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
            <span>Descendente</span>
          </label>
        </div>
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
