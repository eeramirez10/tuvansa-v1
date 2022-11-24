import { Container, Grid, Paper } from '@mui/material';
import QRCode from "react-qr-code"



const QrToPrintInventario = ({ componetRef, inventarios }) => {



    return (




        <Paper component="div" ref={componetRef}   >

            {
                inventarios.map((inventario, i) => {



                    return <Grid container




                        key={i}

                        sx={{ height: 1055, width: "100%", display: "flex", justifyContent: "center", }}
                    >


                        <Grid item md={6} sm={12} sx={{ textAlign: 'center', display: "flex", flexDirection: "column", justifyContent: "center", }} >
                            <div style={{ fontSize: 45, marginBottom: 30 }} > <strong> {inventario.I2DESCR}  </strong> </div>
                            <div style={{ fontSize: 55, marginBottom: 30 }}  >  <u> <strong> {inventario.IEAN} </strong>  </u>  </div>
                            <div style={{ fontSize: 55, marginBottom: 50 }} > <strong> {inventario.ICOD} </strong>  </div>

                            {/* <h1> Cantidad : <strong> {inventario.ALMCANT}  </strong>  </h1> */}
                        </Grid>

                        <Grid item sm={12} md={12}  >

                            <QRCode style={{ display: "block", margin: "0 auto" }} value={`inventarios.dyndns.org/inventario/detail/${inventario.ISEQ}`} size={310} />

                        </Grid>



                    </Grid>



                })


            }

        </Paper>


    )
}

export default QrToPrintInventario

