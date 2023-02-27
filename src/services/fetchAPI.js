export const fetchAPI = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  if (!response.ok) {
    const { msg } = await response.json();
    throw new Error(msg);
  }
  const { results } = await response.json();
  results.forEach((planet) => delete planet.residents);
  return results;
};
