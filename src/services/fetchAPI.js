export const fetchAPI = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const { results } = await response.json();
  results.forEach((planet) => delete planet.residents);
  return results;
};
