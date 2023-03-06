import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCharts } from '../../../hooks/useCharts'
import { getAcumulado } from '../../../services/charts'
import { MediaControlCard } from '../../cards/Card'

const Acumulado = () => {

    const [title, setTitle] = useState('General')

    const { data: sucursal, isLoading, setIsLoading } = useCharts()

    const [acumulado, setAcumulado] = useState({
        costo: 0,
        ventaNeta: 0,
        utilidad: 0,
        porcentaje: 0
    })



    useEffect(() => {

        setIsLoading(true)

        if (sucursal.name) {


            setTitle(sucursal.name)


        }

        getAcumulado({ sucursal: sucursal.name ? sucursal.name : "all" })
            .then(({ data }) => {

                setIsLoading(false)

                setAcumulado(...data);


            })



    }, [sucursal.name, setIsLoading])



    return (
        <>

            <Grid item xs={12} md={12} lg={12}>

                <Typography component="div" color="text.secondary" variant="h3" align='center' marginBottom={2}>
                    {title}
                </Typography>

            </Grid>

            <Grid item xs={6} md={6} lg={3} >

                <MediaControlCard
                    title={'Venta'}
                    subtitle={acumulado.ventaNeta}
                    icon="venta"
                    isLoading={isLoading}
                />

            </Grid>
            <Grid item xs={6} md={6} lg={3}>
                <MediaControlCard title={'Costo'} subtitle={acumulado.costo} icon="costo" isLoading={isLoading} />
            </Grid>
            <Grid item xs={6} md={6} lg={3}>
                <MediaControlCard title={'Utilidad'} subtitle={acumulado.utilidad} icon="utilidad" isLoading={isLoading} />
            </Grid>

            <Grid item xs={6} md={6} lg={3}>
                <MediaControlCard title={'Porc.'} subtitle={acumulado.porcentaje} icon="porcentaje" isLoading={isLoading} />
            </Grid>

        </>
    )
}

export default Acumulado