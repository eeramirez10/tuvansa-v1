import { fetchSinToken } from "../helpers/fetch"


export const getReporte = async (inicio, final) =>{

  const resp = await  fetchSinToken('embarques/reporte',{inicio, final},'','GET','');

  const body = await resp.json();


  return body;

}