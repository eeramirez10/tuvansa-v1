import { fetchSinToken } from "../helpers/fetch";

export const getXml = async (page, rowsPerPage, search) => {

    const columns = [
        { id: 'fecha', label:'fecha'},
        { id: 'codigoProveedor', label:'codigoProveedor'},
        { id: 'proveedor', label:'proveedor'},
        {id: 'sucursal', label:'sucursal'},
        {id:'importe', label:'importe'},
        {id: 'factura', label:'factura'},
        {id: 'rfc', label:'rfc'},
        {id:'uid', label:'uid'},
        {id:'pdf', label:'pdf'},
    ]

    const endpoint = 'compras/xml';

    const resp = await fetchSinToken(endpoint,{ page, size:rowsPerPage, search });

    const body = await resp.json();

    const data = body.data;

    return {
        data,
        columns
    }
    

}

export const getPdf = async (factura) => {

    const endpoint = `compras/pdf/${factura}`;

    const resp = await fetchSinToken(endpoint);

    const body = await resp.arrayBuffer()


   return body;
}