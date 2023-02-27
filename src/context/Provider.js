import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { fetchAPI } from '../services/fetchAPI';
import context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    (async () => {
      setPlanets(await fetchAPI());
    })();
  }, []);

  const values = {
    planets,
    setPlanets,
  };

  return <context.Provider value={ values }>{children}</context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default Provider;
