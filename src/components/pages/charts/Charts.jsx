import React, { useContext, useEffect, useState } from 'react'

import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';

import BasicLine from '../../shared/charts/BasicLine';
import Column from '../../shared/charts/Column';

import { useAuth } from '../../../hooks/useAuth';

import { MediaControlCard } from '../../cards/Card';
import { Pie } from '../../shared/charts/Pie';

const Charts = () => {

    const { auth } = useAuth();

    if (auth.rol !== 'admin') {



        return (
            <>

                <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%' }} >
                    <Box sx={{ flexGrow: 1 }}>
                        No tienes permisos para ver esta pagina
                    </Box>
                </Container>

            </>
        )
    }

    return (

        <>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, minHeight:1000 }} >
                <Box sx={{ flexGrow: 1 }}>

                    <Grid container spacing={2} sx={{ marginBottom: 5 }}>
                        <Grid item xs={12} md={6} lg={3} >

                            <MediaControlCard title={'Venta Neta'} subtitle={'$2,000,000.00'} icon="venta" />

                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MediaControlCard title={'Costo'} subtitle={'$5,000,000.00'} icon="costo" />
                        </Grid>
                        <Grid item xs={12} md={6} lg={3}>
                            <MediaControlCard title={'Utilidad'} subtitle={'$2,000,000.00'} icon="utilidad" />
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <MediaControlCard title={'Porcentaje'} subtitle={'$2,000,000.00'} icon="porcentaje" />
                        </Grid>

                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>

                            <BasicLine  />

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Column />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Pie />
                        </Grid>

                    </Grid>
                </Box>
            </Container>

        </>





    )
}

export default Charts