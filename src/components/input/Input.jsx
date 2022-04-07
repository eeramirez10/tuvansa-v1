import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

const Input = ({
    label,
    ...props

}) => {
    return (
        <TextField
            label={label}
            
            variant="standard"
            {...props}
        />
    )
}

export default Input