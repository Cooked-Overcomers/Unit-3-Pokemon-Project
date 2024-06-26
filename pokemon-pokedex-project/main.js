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
  
  const fetchDataNames = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?&limit=1302';
    const [data, error] = await fetchData(url);
    if (error) {
      console.error('Cannot fetch names');
      return;
    }
  
    const first20Pokemon = data.results.slice(0, 20);
  
    const fetchedPokemonDetails = first20Pokemon.map(pokemon => fetchPokemonDetails(pokemon.name));
    const allPokemonDetails = await Promise.all(fetchedPokemonDetails);
  
    const allInfo = allPokemonDetails.map(details => {
      if (details) {
        return {
          name: details.name,
          images: details.sprites.front_default,
          height: details.height,
          weight: details.weight,
        };
      }
      return null;
    });
  
    console.log(allInfo);
  };
  
  fetchDataNames();
  