import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchAPI } from '../services/fetchAPI';
import context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsBySelections, setPlanetsBySelections] = useState(planets);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([]);

  const { fetchData, isLoading } = useFetch();

  useEffect(() => {
    (async () => fetchData(fetchAPI(), setPlanets))();
  }, [fetchData]);

  useEffect(() => {
    setPlanetsBySelections(planets);
  }, [planets]);

  const filterByName = useCallback(
    () => planetsBySelections
      .filter((planet) => String(planet.name)
        .toLowerCase()
        .includes(search.toLocaleLowerCase())),
    [planetsBySelections, search],
  );

  useEffect(() => {
    filters.forEach((filter) => {
      const { column, comparison, valueFilter } = filter;

      setPlanetsBySelections((p) => p.filter((planet) => {
        switch (comparison) {
        case 'maior que':
          return (
            planet[column] !== 'unknown'
                && Number(planet[column]) > Number(valueFilter)
          );
        case 'menor que':
          return (
            planet[column] !== 'unknown'
                && Number(planet[column]) < Number(valueFilter)
          );
        case 'igual a':
          return (
            planet[column] !== 'unknown'
                && Number(planet[column]) === Number(valueFilter)
          );
        default:
          return false;
        }
      }));
    });
  }, [filters]);

  useEffect(() => {
    setFilteredPlanets(filterByName);
  }, [filterByName]);

  const values = useMemo(
    () => ({
      planets,
      isLoading,
      filteredPlanets,
      search,
      planetsBySelections,
      filters,
      setFilters,
      setPlanets,
      setFilteredPlanets,
      setPlanetsBySelections,
      setSearch,
    }),
    [planets, isLoading, filteredPlanets, search, planetsBySelections, filters],
  );

  return <context.Provider value={ values }>{children}</context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Provider;
