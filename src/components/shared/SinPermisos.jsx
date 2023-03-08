import { Box, Container } from '@mui/material'
import React from 'react'


const SinPermisos = () => {



    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%' }} >
            <Box sx={{ flexGrow: 1 }}>
                No tienes permisos para ver esta pagina
            </Box>
        </Container>
    )
}

export default SinPermisos