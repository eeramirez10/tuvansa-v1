import { Container } from '@mui/material'
import React from 'react'
import TableUi from '../../table/TableUi'

const Gastos = () => {

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%' }} >
            <TableUi />
        </Container>
    )
}

export default Gastos