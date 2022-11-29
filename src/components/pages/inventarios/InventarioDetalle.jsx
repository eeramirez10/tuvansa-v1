import { Button, Container, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import Moment from 'react-moment';



import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { fetchConToken, fetchSinToken } from '../../../helpers/fetch';
import { toast } from 'react-toastify';



const InventarioDetalle = () => {

    const { idInventario } = useParams();

    const [inventario, setInventario] = useState({})

    const [conteos, setConteos] = useState([]);

    const [isLoading, setIsLoading] = useState(false)



    const [value, setValue] = useState('')

    const handleChange = ({ target }) => {


        setValue(target.value)
    }


    useEffect(() => {


        fetchConToken(`inventarios/detail/${idInventario}`, '', '', "GET")
            .then(async (resp) => {



                const body = await resp.json()

                if (!body.ok) return console.log(body);


                setInventario(body.inventario)


            });


        fetchConToken(`inventarios/conteo/${idInventario}`, '', '', "GET")
            .then(resp => resp.json())
            .then(body => {
                const { conteos } = body;

                setConteos([...conteos])
            });



    }, [idInventario]);





    const handleSubmit = (e) => {
        e.preventDefault();

        if(!value) return toast.error('El conteo no puede ir vacio',{ position: toast.POSITION.TOP_CENTER, autoClose: 2000  });

        if(!Number(value)) return toast.error('Solo Valores Numericos',{ position: toast.POSITION.TOP_CENTER, autoClose: 2000  });

        setIsLoading(true)


        const createUpdateInventory =

            fetchConToken("inventarios", '', { inventario, conteo: value }, 'POST')
                .then(resp => resp.json())
                .then(body => {
                    const { conteos } = body;

                    console.log(conteos)

                    setConteos([...conteos])

                    setValue('');

                    setIsLoading(false)


                })
                .catch(console.log)


        toast.promise(createUpdateInventory,
            { pending: 'Guardando', success: 'guardado correctamente 👌', error: 'Hubo un error 🤯' },
            { position: toast.POSITION.TOP_CENTER, autoClose: 2000 }
        )


    }



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
                    <Typography sx={{ mb: 3 }}>
                        Existencia en proscai: {inventario.ALMCANT}
                    </Typography>

                    {
                        conteos.map((conteo, i) => {



                            return <Typography
                                key={i}
                                color="text.secondary"
                                sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}
                            >

                                <div style={{widht:200}}>

                                    <strong> Conteo {i + 1}: {conteo.cantidad}</strong>

                                </div>

                                <div>

                                    {conteo.name}

                                </div>

                                <div>

                                    <Moment format='DD/MM/YYYY HH:ss ' date={conteo.createdAt} />

                                </div>


                            </Typography>
                        })
                    }


                    <Typography component="div" >

                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { width: '25ch' },

                            }}
                            noValidate
                            autoComplete='off'
                            onSubmit={handleSubmit}
                        >
                            <Box
                                component="div"
                                sx={{ display: "flex" }}
                            >
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Conteo"
                                    multiline
                                    maxRows={4}
                                    value={value}
                                    onChange={handleChange}
                                />

                                <Button
                                    variant='contained'
                                    size="small"
                                    type='submit'
                                    disabled = {isLoading}
                                >
                                    guardar
                                </Button>

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