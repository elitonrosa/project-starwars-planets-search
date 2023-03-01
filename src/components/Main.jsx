import React from 'react';

import BtnRemoveFilters from './BtnRemoveFilters';
import NumericFilter from './NumericFilter';
import OrderFilter from './OrderFilter';
import SearchInput from './SearchInput';
import Table from './Table';

function Main() {
  return (
    <>
      <header>
        <h1>Star Wars Project</h1>
      </header>
      <main>
        <section>
          <SearchInput />
          <NumericFilter />
          <OrderFilter />
          <BtnRemoveFilters />
        </section>
        <section>
          <Table />
        </section>
      </main>
    </>
  );
}

export default Main;
