import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchAPI } from '../services/fetchAPI';
import context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const { fetchData, isLoading } = useFetch();

  useEffect(() => {
    (async () => fetchData(fetchAPI(), setPlanets))();
  }, [fetchData]);

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  const filterByName = useCallback(
    () => planets
      .filter((planet) => String(planet.name)
        .toLowerCase()
        .includes(search.toLocaleLowerCase())),
    [planets, search],
  );

  useEffect(() => {
    setFilteredPlanets(filterByName);
  }, [filterByName]);

  const values = useMemo(
    () => ({
      planets,
      isLoading,
      filteredPlanets,
      search,
      setPlanets,
      setFilteredPlanets,
      setSearch,
    }),
    [planets, isLoading, filteredPlanets, search],
  );

  return <context.Provider value={ values }>{children}</context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Provider;
