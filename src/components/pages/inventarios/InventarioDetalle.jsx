import { Button, Container, Grid, Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code"
import { fetchSinToken } from '../../../helpers/fetch';
import { useReactToPrint } from 'react-to-print';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const InventarioDetalle = () => {

    const { idInventario } = useParams();

    const [inventario, setInventario] = useState({})

    const componetRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componetRef.current,
        pageStyle: `
        @page {
            size: auto;
            
          }

          @media all {
            .pagebreak {
              display: none;
            }
          }
        
          @media print {
            .pagebreak {
              page-break-before: always;
            }
          }
        
        `,
        removeAfterPrint: true,
        copyStyles: true

    })


    useEffect(() => {

        fetchSinToken(`inventarios/detail/${idInventario}`, '', '', "GET")
            .then(async (resp) => {
                const body = await resp.json()

                if (!body.ok) return console.log(body);
                console.log(body.inventario)

                setInventario(body.inventario)
            })



    }, [idInventario]);

    console.log(inventario)



    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%' }} >

            <Paper component="div" >

                <Grid container spacing={1} ref={componetRef}   >


                    <Grid item md={6} sm={12}  >

                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {inventario.I2DESCR}
                                </Typography>

                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {inventario.ICOD}

                                </Typography>
                                <Typography variant="h5" component="div">
                                    {inventario.IEAN}
                                </Typography>
                                <Typography variant="body2">

                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>

                    </Grid>



                </Grid>

            </Paper>


        </Container>
    )
}

export default InventarioDetalle