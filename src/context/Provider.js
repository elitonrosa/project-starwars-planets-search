import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import context from './Context';
import useFetch from '../hooks/useFetch';
import { COLUMN_OPTIONS } from '../services/constTypes';
import { fetchAPI } from '../services/fetchAPI';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsBySelections, setPlanetsBySelections] = useState(planets);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const [search, setSearch] = useState('');

  const [filters, setFilters] = useState([]);
  const [options, setOptions] = useState(COLUMN_OPTIONS);

  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const { fetchData, isLoading } = useFetch();

  useEffect(() => {
    (async () => fetchData(fetchAPI(), setPlanets))();
  }, [fetchData]);

  useEffect(() => {
    setPlanetsBySelections(planets);
  }, [planets]);

  const filterByName = useCallback(() => {
    const { column, sort } = order;

    const array = planetsBySelections
      .filter((planet) => String(planet.name)
        .toLowerCase().includes(search.toLocaleLowerCase()))
      .sort((a, b) => (sort === 'ASC'
        ? Number(a[column]) - Number(b[column])
        : Number(b[column]) - Number(a[column])));
    return [
      ...array.filter((planet) => planet[column] !== 'unknown'),
      ...array.filter((planet) => planet[column] === 'unknown'),
    ];
  }, [planetsBySelections, search, order]);

  useEffect(() => {
    setPlanetsBySelections(planets);

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
  }, [filters, planets]);

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
      options,
      order,
      setOrder,
      setOptions,
      setFilters,
      setPlanets,
      setFilteredPlanets,
      setPlanetsBySelections,
      setSearch,
    }),
    [
      planets,
      isLoading,
      filteredPlanets,
      search,
      planetsBySelections,
      filters,
      options,
      order,
    ],
  );

  return <context.Provider value={ values }>{children}</context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Provider;
