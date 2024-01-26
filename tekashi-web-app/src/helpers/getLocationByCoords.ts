export const getLocationByCoords =  async (lat: number | string, long: number | string) => {
    const token = "pk.b7b451910950722404aeb5745fcc23ce" // Ocultar esto
    const url = `https://us1.locationiq.com/v1/reverse?key=${token}&lat=${lat}&lon=${long}&format=json`
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    try{
        const res = await fetch(url, options)
        const data = await res.json()
        return data.address
    }catch(e){
        console.error(e)
    }
}