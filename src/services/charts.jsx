import { fetchSinToken } from "../helpers/fetch";

export const getSucursalesVentas = async () => {

    const endpoint = 'charts/sucursales';

    const resp = await fetchSinToken(endpoint);

    const body = await resp.json();

    return body;

}

export const getVendedoresVentas = async (sucursal = 1, month, year) => {



    const endpoint = 'charts/vendedores';

    const resp = await fetchSinToken(endpoint, { sucursal, month, year });

    const body = await resp.json();

    return body;

}


export const getFamilias = async (sucursal = "Mexico", month, year = new Date().getFullYear()) => {


    
    const endpoint = 'charts/familias';

    const resp = await fetchSinToken(endpoint, {sucursal, month, year});

    const body = await resp.json();

    return body;

}

export const getAcumulado = async ({sucursal = "all", year = ""}) => {

   

    const endpoint = 'charts/acumulado';

    const resp = await fetchSinToken(endpoint, {sucursal,year});

    const body = await resp.json();



    return body;


}