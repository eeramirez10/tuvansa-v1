import { fetchSinToken } from "../helpers/fetch";

export const getSucursalesVentas = async () => {

    const endpoint = 'charts/sucursales';

    const resp = await fetchSinToken(endpoint);

    const body = await resp.json();

    return body;

   
    


}