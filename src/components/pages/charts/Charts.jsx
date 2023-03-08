import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import BasicLine from '../../shared/charts/BasicLine';
import Column from '../../shared/charts/Column';
import { useAuth } from '../../../hooks/useAuth';
import { Pie } from '../../shared/charts/Pie';
import Acumulado from '../../shared/charts/Acumulado';
import useWindowSize from '../../../hooks/useWindowSize';
import { useLocation} from 'react-router-dom';
import SinPermisos from '../../shared/SinPermisos';



const Charts = () => {

    const { isAllow } = useAuth();



    const ref = useRef(null);

    const size = useWindowSize();

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);



    useEffect(() => {

        if (ref.current) {

            setWidth(ref.current.offsetWidth - 17);
            setHeight(ref.current.offsetHeight);

        }




    }, [size]);
    

   
    if (!isAllow) {



        return <SinPermisos />
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
                            <Column height={height} width={width} />
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