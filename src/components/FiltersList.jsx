import React, { useContext } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

import context from '../context/Context';
import styles from '../styles/FiltersList.module.sass';

function FiltersList() {
  const { filters, setFilters, setOptions } = useContext(context);

  const removeFilter = (filterName) => {
    setFilters(filters.filter((filter) => filter.column !== filterName));
    setOptions((p) => [filterName, ...p]);
  };

  return (
    <div className={ styles.filtersContainer }>
      <hr />
      {
        filters.length === 0 ? (
          <p>Nenhum filtro selecionado</p>
        ) : (
          <div className={ styles.filtersList }>
            {filters.map((filter, index) => {
              const { column, comparison, valueFilter } = filter;
              return (
                <div key={ index } data-testid="filter" className={ styles.filter }>
                  <div>
                    <p>
                      {column}
                      {' '}
                      {comparison === 'maior que'
                        ? '>'
                        : comparison === 'menor que'
                          ? '<'
                          : '='}
                      {' '}
                      {valueFilter}
                    </p>
                  </div>
                  <button
                    onClick={ () => removeFilter(column) }
                    data-testid="button-remove-filter"
                  >
                    <MdDeleteOutline className={ styles.deleteIcon } size="20" />
                  </button>
                </div>
              );
            })}
          </div>
        )
      }
      <hr />
    </div>
  );
}

export default FiltersList;
