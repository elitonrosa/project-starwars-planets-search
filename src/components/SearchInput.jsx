import React, { useContext } from 'react';

import context from '../context/Context';
import search from '../assets/svg/search.svg';

export default function SearchInput() {
  const { setSearch } = useContext(context);

  return (
    <>
      <input
        className="search-input"
        data-testid="name-filter"
        type="text"
        onChange={ (e) => setSearch(e.target.value) }
      />
      <img src={ search } alt="Search" />
    </>
  );
}
