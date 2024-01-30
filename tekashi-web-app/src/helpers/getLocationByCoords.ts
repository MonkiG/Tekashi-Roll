import config from './config'
export const getLocationByCoords = async (lat: number | string, long: number | string): Promise<any> => {
  const url = `https://us1.locationiq.com/v1/reverse?key=${config.GEO_API_TOKEN}&lat=${lat}&lon=${long}&format=json`
  const options = { method: 'GET', headers: { accept: 'application/json' } }

  try {
    const res = await fetch(url, options)
    const data = await res.json()
    return data.address
  } catch (e) {
    console.error(e)
  }
}
