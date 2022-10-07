import React, { useContext, useEffect, useState } from 'react'

import { Button, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { getSucursalesVentas, getVendedoresVentas } from '../../../services/charts';
import BasicLine from '../../shared/charts/BasicLine';
import Column from '../../shared/charts/Column';

import { useAuth } from '../../../hooks/useAuth';

import { MediaControlCard } from '../../cards/Card';
import { Pie } from '../../shared/charts/Pie';





const Charts = () => {

    const { auth } = useAuth();


    const [sucursalesData, setSucursalesData] = useState(null)

    const [vendedoresData, setVendedoresData] = useState(null);


    useEffect(() => {

        getSucursalesVentas()
            .then(({ data }) => {

                setSucursalesData(data)

            })

        getVendedoresVentas()
            .then(({ data }) => {
                setVendedoresData(data)
            })




    }, [])




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

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%' }} >
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
                        <Grid item xs={12} md={6}>

                            <BasicLine data={sucursalesData} />

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Column data={vendedoresData} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Pie />
                        </Grid>

                    </Grid>
                </Box>
            </Container>

        </>





    )
}

export default Charts