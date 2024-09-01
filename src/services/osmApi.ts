const url = `https://api.geoapify.com/v1/geocode/autocomplete?text={searchText}&apiKey=${process.env.REACT_APP_OSM_API_KEY}`

async function searchForAddress(searchText: string) {
  const result = await fetch(
    url.replace('{searchText}', encodeURIComponent(searchText)),
  )
  const resultObj = await result.json()

  return resultObj
}

const osmApi = {
  searchForAddress,
}

export default osmApi
