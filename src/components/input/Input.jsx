import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

const Input = ({
    label,
    variant="standard",
    ...props

}) => {
    return (
        <TextField
            label={label}
            
            variant={variant}
            {...props}
        />
    )
}

export default Input