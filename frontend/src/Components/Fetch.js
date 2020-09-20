// this module is made to test the fetching, to make sure results come back

async function APIFetch() {
  const rawData = await fetch(
    "https://itunes.apple.com/search?term=drake&media=music"
  );
  const JSONdata = await rawData.json();
  const results = JSONdata.results;
  return results;
}

export default APIFetch;
