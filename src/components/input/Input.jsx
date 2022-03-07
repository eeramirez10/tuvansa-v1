import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

const Input = ({
    label,
    ...props

}) => {
    return (
        <TextField
            label={label}
            id="filled-start-adornment"
            
            variant="outlined"
            {...props}
        />
    )
}

export default Input