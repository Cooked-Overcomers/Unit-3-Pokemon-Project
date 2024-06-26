const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }

    const isJson = (response.headers.get('content-type') || '').includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    return [data, null];
  } catch (error) {
    console.error(error.message);
    return [null, error];
  }
};

const fetchPokemonDetails = async (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const [data, error] = await fetchData(url);
  if (error) {
    console.error('Cannot fetch details for', name);
    return null;
  }
  return data;
};




export { fetchData, fetchPokemonDetails };