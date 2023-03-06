import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import BasicLine from '../../shared/charts/BasicLine';
import Column from '../../shared/charts/Column';
import { useAuth } from '../../../hooks/useAuth';
import { Pie } from '../../shared/charts/Pie';
import Acumulado from '../../shared/charts/Acumulado';
import useWindowSize from '../../../hooks/useWindowSize';



const Charts = () => {

    const { auth } = useAuth();

    const ref = useRef(null);

    const size = useWindowSize();

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);


    useEffect(() => {
        setWidth(ref.current.offsetWidth - 17 );
        setHeight(ref.current.offsetHeight);

      
    }, [size]);

    console.log(width, height)


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

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, minHeight: 1000 }} >
                <Box sx={{ flexGrow: 1 }}>

                    <Grid container spacing={2} sx={{ marginBottom: 5 }} >

                        <Acumulado />

                    </Grid>


                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4} ref={ref}  >

                            <BasicLine />

                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Column height={height} width={width}  />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Pie height={height} width={width} />
                        </Grid>

                    </Grid>
                </Box>
            </Container>

        </>





    )
}

export default Charts