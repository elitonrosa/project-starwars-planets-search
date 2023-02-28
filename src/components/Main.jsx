import React from 'react';
import NumericFilter from './NumericFilter';
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
        </section>
        <section>
          <Table />
        </section>
      </main>
    </>
  );
}

export default Main;
