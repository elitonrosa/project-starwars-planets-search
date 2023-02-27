import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchAPI } from '../services/fetchAPI';
import context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

  const { fetchData, isLoading } = useFetch();

  useEffect(() => {
    (async () => {
      await fetchData(fetchAPI(), setPlanets);
    })();
  }, []);

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  const values = useMemo(() => ({
    planets, isLoading, setFilteredPlanets, filteredPlanets,
  }), [planets, isLoading, filteredPlanets]);

  return <context.Provider value={ values }>{children}</context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Provider;
