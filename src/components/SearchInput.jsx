import React, { useContext, useEffect } from 'react';
import context from '../context/Context';

export default function SearchInput() {
  const {
    filterByNameAndColumn,
    setFilteredPlanets,
    setSearch,
    search,
  } = useContext(context);

  useEffect(() => {
    setFilteredPlanets(filterByNameAndColumn());
  }, [search]);

  return (
    <input
      data-testid="name-filter"
      type="text"
      placeholder="Digite o nome de um Planeta"
      onChange={ (e) => setSearch(e.target.value) }
    />
  );
}
