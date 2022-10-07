import { utils, writeFile } from 'xlsx';


export const excelExport = (dataExport, name) =>{

    let wb = utils.book_new();
    let ws = utils.json_to_sheet(dataExport);

    utils.book_append_sheet(wb, ws, "MYSheet1");

    writeFile(wb, `${name}.xlsx`);

}