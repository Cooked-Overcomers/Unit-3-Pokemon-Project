const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Fetch failed. ${response.status} ${response.statusText}`)
    }

    const isJson = (response.headers.get('content-type') || '').includes('application/json')
    let data = isJson ? await response.json() : await response.text()
    console.log(data)

    return [data, null];
  }
  catch (error) {
    console.error(error.message);

    return [null, error];
  }
}


const fetchDataNames = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon/?&limit=1302'
  const [data, error] = await fetchData(url)
  if (error) {
    console.error('Can fetch names')
  }
  const first20Pokemon = data.results.slice(0, 20)
  console.log(first20Pokemon)
}

fetchDataNames()