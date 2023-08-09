import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const SelectUI = ({label, value, handleChange, options}) => {


    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    onChange={handleChange}
                >
                    {
                        options.map( ( op, i) => (
                            <MenuItem key={i} value={op.value}>{op.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    )
}
