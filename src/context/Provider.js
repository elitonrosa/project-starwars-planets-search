import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchAPI } from '../services/fetchAPI';
import context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    numberValue: '0',
  });
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

  const { fetchData, isLoading } = useFetch();

  useEffect(() => {
    (async () => {
      await fetchData(fetchAPI(), setPlanets);
    })();
  }, []);

  const filterByNameAndColumn = () => planets
    .filter((planet) => planet.name.includes(search))
    .filter((planet) => {
      switch (filters.comparisonFilter) {
      case 'igual a':
        return Number(planet[filters.columnFilter]) === Number(filters.numberValue);
      case 'menor que':
        return Number(planet[filters.columnFilter]) < Number(filters.numberValue);
      case 'maior que':
        return Number(planet[filters.columnFilter]) > Number(filters.numberValue);
      default:
        return true;
      }
    });

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  const values = useMemo(
    () => ({
      planets,
      isLoading,
      setFilteredPlanets,
      filteredPlanets,
      filterByNameAndColumn,
      setSearch,
      search,
      filters,
      setFilters,
    }),
    [planets, isLoading, filteredPlanets, search, filters],
  );

  return <context.Provider value={ values }>{children}</context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Provider;
