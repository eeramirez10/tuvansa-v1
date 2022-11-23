import { Container, Grid, Paper } from '@mui/material';
import QRCode from "react-qr-code"



const QrToPrintInventario = ({ componetRef, inventarios }) => {



    return (


        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%', display:'none'}} >

            <Paper component="div" ref={componetRef}   >

                {
                   inventarios.map((inventario, i) => {



                        return <Grid container

                          
                            spacing={1}

                            key={i}

                            sx={{ height: 1062 }}
                        >


                            <Grid item md={6} sm={12} sx={{ textAlign: 'center', display: "flex", flexDirection: "column", justifyContent: "center", }} >
                                <div style={{ fontSize: 45, marginBottom: 30 }} > <strong> {inventario.I2DESCR}  </strong> </div>
                                <div style={{ fontSize: 55, marginBottom: 30 }}  >  <u> <strong> {inventario.IEAN} </strong>  </u>  </div>
                                <div style={{ fontSize: 55, marginBottom: 50 }} > <strong> {inventario.ICOD} </strong>  </div>

                                {/* <h1> Cantidad : <strong> {inventario.ALMCANT}  </strong>  </h1> */}
                            </Grid>

                            <Grid item sm={12} md={6} sx={{


                                textAlign: "center"
                            }} >

                                <QRCode value={`inventarios.dyndns.org/inventario/detail/${inventario.ISEQ}`} size={310} />

                            </Grid>



                        </Grid>



                    })


                }

            </Paper>

        </Container>
    )
}

export default QrToPrintInventario

