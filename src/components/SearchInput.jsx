import React, { useContext } from 'react';
import context from '../context/Context';

export default function SearchInput() {
  const { setSearch } = useContext(context);

  return (
    <input
      data-testid="name-filter"
      type="text"
      placeholder="Digite o nome de um Planeta"
      onChange={ (e) => setSearch(e.target.value) }
    />
  );
}
