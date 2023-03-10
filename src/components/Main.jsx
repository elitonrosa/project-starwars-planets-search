import React from 'react';

import NumericFilter from './NumericFilter';
import OrderFilter from './OrderFilter';
import SearchInput from './SearchInput';
import Table from './Table';
import Header from './Header';
import FiltersList from './FiltersList';

import styles from '../styles/Main.module.sass';

function Main() {
  return (
    <div className={ styles.bodyCover }>
      <Header />
      <main>
        <section>
          <div className={ styles.searchContainer }>
            <SearchInput />
          </div>
          <div className={ styles.filtersContainer }>
            <NumericFilter />
            <OrderFilter />
          </div>
          <FiltersList />
        </section>
        <section>
          <Table />
        </section>
      </main>
    </div>
  );
}

export default Main;
