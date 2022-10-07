import { fetchSinToken } from "../helpers/fetch";

export const getSucursalesVentas = async () => {

    const endpoint = 'charts/sucursales';

    const resp = await fetchSinToken(endpoint);

    const body = await resp.json();

    return body;

}

export const getVendedoresVentas = async () => {

    const endpoint = 'charts/vendedores';

    const resp = await fetchSinToken(endpoint);

    const body = await resp.json();

    return body;

}