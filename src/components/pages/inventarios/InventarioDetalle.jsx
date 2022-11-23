import { Button, Container,  TextField } from '@mui/material';
import React, { useEffect,  useState } from 'react'
import { useParams } from 'react-router-dom';

import { fetchSinToken } from '../../../helpers/fetch';


import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



const InventarioDetalle = () => {

    const { idInventario } = useParams();

    const [inventario, setInventario] = useState({})



    const [value, setValue] = useState('')

    const handleChange = ({ target }) => {
        setValue(target.setValue)
    }


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

            <Card >
                <CardContent>
                    <Typography color="text.secondary" component="h1" sx={{ mb: 3 }} >
                        {inventario.I2DESCR}
                    </Typography>
                    {/* 
                                <Typography sx={{ mb: 1.5 }} color="text.secondary" component="span">
                                    {inventario.ICOD}

                                </Typography> */}
                    <Typography component="div" sx={{ mb: 3 }}>
                        {inventario.IEAN}
                    </Typography>
                    <Typography color="text.secondary">
                        Existencia en proscai: {inventario.ALMCANT}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        Ultimo conteo: {inventario.ALMCANT}
                    </Typography>
                    <Typography component="div" >

                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { width: '25ch' },

                            }}
                            noValidate
                            autoComplete='off'
                        >
                            <Box 
                                component="div"  
                                sx={{ display:"flex" }}
                            >
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Conteo"
                                    multiline
                                    maxRows={4}
                                    value={value}
                                    onChange={handleChange}
                                />

                                <Button variant='contained' size="small">guardar</Button>

                            </Box>


                        </Box>

                    </Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>



        </Container>
    )
}

export default InventarioDetalle