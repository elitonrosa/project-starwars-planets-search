import React, { useContext, useEffect, useState } from 'react';
import context from '../context/Context';

export default function SearchInput() {
  const [search, setSearch] = useState('');

  const { planets, setFilteredPlanets } = useContext(context);

  const filterByName = planets
    .filter((planet) => planet.name.includes(search));

  useEffect(() => {
    setFilteredPlanets(filterByName);
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
