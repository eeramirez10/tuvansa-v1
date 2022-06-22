import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const RangePicker = ({label,name,value, handleFechas,...rest}) => {


    return (
        <DatePicker
            
            label={label}
            value={value}
            onChange={(newValue) => handleFechas(name, newValue)}
            renderInput={(params) => <TextField {...rest} {...params} />}
        />
    )
}
