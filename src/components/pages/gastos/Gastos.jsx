import { Container } from '@mui/material'
import React from 'react'
import { useAuth } from '../../../hooks/useAuth';
import SinPermisos from '../../shared/SinPermisos';
import TableUi from '../../table/TableUi'

const Gastos = () => {

    const { isAllow } = useAuth();

    if (!isAllow) return <SinPermisos />

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%' }} >
            <TableUi />
        </Container>
    )
}

export default Gastos