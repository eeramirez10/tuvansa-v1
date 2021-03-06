import React, { useContext, useEffect,useState } from 'react'

import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { getSucursalesVentas } from '../../../services/charts';
import BasicLine from '../../shared/charts/BasicLine';
import Column from '../../shared/charts/Column';

import { useAuth } from '../../../hooks/useAuth';


const lineOptions = {
    title: {
        text: 'Ventas Sucursales - 2022'
    },

    subtitle: {
        text: ''
    },

    yAxis: {
        title: {
            text: ''
        }
    },

    xAxis: {
        type: 'category'
    },

    // legend: {
    //     layout: 'vertical',
    //     align: 'right',
    //     verticalAlign: 'middle'
    // },

    plotOptions: {
        line: {
            dataLabels: {
                enabled: false
            },
            enableMouseTracking: true
        }
    },

    series: [],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
};

const Charts = () => {

    const { auth } = useAuth();


    const [options, setOptions] = useState(lineOptions)

    const [data, setData] = useState({});


    useEffect(() => {



        getSucursalesVentas()
            .then(({ data }) => {

                setData(data);

                setOptions(o => ({
                    ...o,
                    series: data
                }))
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <BasicLine options={options} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Column data={data} />
                        </Grid>
                        <Grid item xs={12} md={6}>

                        </Grid>

                    </Grid>
                </Box>
            </Container>

        </>





    )
}

export default Charts