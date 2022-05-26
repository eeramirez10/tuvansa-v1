import { fetchSinToken } from "../helpers/fetch";

export const getXml = async (page, rowsPerPage, search, signal) => {

    

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

    const resp = await fetchSinToken(endpoint,{ page, size:rowsPerPage, search },'','GET',signal);

    const body = await resp.json();

    const data = body.data;

    return {
        data,
        columns
    }
    

}

export const getPdf = async (type,fileName) => {

    const resp = await fetchSinToken(`files/${type}/${fileName}`);

    const body = await resp.arrayBuffer()


   return body;
}


export const getEmbarques = async (page, rowsPerPage, search, signal) =>{

    const resp = await fetchSinToken('embarques',{page, size:rowsPerPage, search},'','GET',signal);
    const body = await resp.json();

    return body.data;

}

