import { Button, Container, Grid, Paper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code"
import { fetchSinToken } from '../../../helpers/fetch';


const QrToPrintInventario = ({ componetRef, inventario }) => {

    console.log(inventario)

    return (


        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%', display: 'none' }} >

            <Paper component="div" >

                <Grid container spacing={1} ref={componetRef} sx={{ padding: 2 }}  >


                    <Grid item md={6} sm={12} sx={{ textAlign: 'center', display: "flex", flexDirection: "column", justifyContent: "center", }} >
                        <div style={{ fontSize: 45, marginBottom: 30 }} > <strong> {inventario.I2DESCR}  </strong> </div>
                        <div style={{ fontSize: 55, marginBottom: 30 }}  >  <u> <strong> {inventario.IEAN} </strong>  </u>  </div>
                        <div style={{ fontSize: 55, marginBottom: 30 }} > <strong> {inventario.ICOD} </strong>  </div>

                        {/* <h1> Cantidad : <strong> {inventario.ALMCANT}  </strong>  </h1> */}
                    </Grid>

                    <Grid item sm={12} sx={{ position:"absolute", bottom: 20, width:"100%" }}  >

                        <div style={{ textAlign: 'center', display: "flex", flexDirection: "row", justifyContent: "center", alignItems:"center", alignContent:"center",  }} >


                            <Grid container item md={12} sm={12}  >
                                <QRCode value={`inventarios.dyndns.org/inventario/detail/${inventario.ISEQ}`} size={250} />
                            </Grid>

                            <Grid item md={12} sm={12} sx={{ display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center", justifyContent: "center", }} >


                                <div style={{ display: "flex", }} >
                                    <div style={{ fontSize: 40 }} > <strong> Conteo 1 </strong>  </div>
                                    <input type="text" name="" id="" style={{ border: 'none', borderBottom: "2px solid black", marginLeft: 10 }} />
                                </div>

                                <div style={{ display: "flex",}}>

                                    <div style={{ fontSize: 40 }}  > <strong> Conteo 2 </strong>  </div>
                                    <input type="text" name="" id="" style={{ border: 'none', borderBottom: "2px solid black", marginLeft: 10 }} />

                                </div>


                                <div style={{ display: "flex", }}>

                                    <div style={{ fontSize: 40 }}  > <strong> Conteo 3 </strong>  </div>
                                    <input type="text" name="" id="" style={{ border: 'none', borderBottom: "2px solid black", marginLeft: 10 }} />

                                </div>





                            </Grid>


                        </div>



                    </Grid>





                </Grid>

            </Paper>

            {/* <Button
                onClick={handlePrint}
            >
                Imprimir
            </Button> */}
        </Container>
    )
}

export default QrToPrintInventario

