import React, { useContext } from 'react';

import context from '../context/Context';
import { COLUMN_OPTIONS } from '../services/constTypes';

function BtnRemoveFilters() {
  const { setFilters, setOptions } = useContext(context);

  const removeAllFilters = () => {
    setFilters([]);
    setOptions(COLUMN_OPTIONS);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ removeAllFilters }
        data-testid="button-remove-filters"
      >
        Remover todos os filtros
      </button>
    </div>
  );
}

export default BtnRemoveFilters;
