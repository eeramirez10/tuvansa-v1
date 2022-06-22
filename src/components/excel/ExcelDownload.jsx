import { Button } from '@mui/material';
import React from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

import { utils, writeFile } from 'xlsx';
import { RangePicker } from '../shared/datePicker/RangePicker';



export const ExcelDownload = ({ dataExport, name, ...rest }) => {

    const [value, setValue] = React.useState(null);

   

    const handleOnExport = () => {

        let wb = utils.book_new();
        let ws = utils.json_to_sheet(dataExport);

        utils.book_append_sheet(wb, ws, "MYSheet1");

        writeFile(wb, `${name}.xlsx`);

    }



    return (
        <>
            <Button  {...rest} variant='contained' disableElevation  onClick={() => console.log('click')} > Exportar </Button>

           
        </>

    )
}
