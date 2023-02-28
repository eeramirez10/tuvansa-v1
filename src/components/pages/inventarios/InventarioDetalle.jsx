import { Button, Container, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router-dom';

import Moment from 'react-moment';
import { useAuth } from '../../../hooks/useAuth';


import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { fetchConToken } from '../../../helpers/fetch';
import { toast } from 'react-toastify';



const InventarioDetalle = () => {

    const { idInventario } = useParams();

    const [inventario, setInventario] = useState({});

    const [inventarioDB, setInventarioDB] = useState({ PAUSADO: false })

    const [conteos, setConteos] = useState([]);

    const [isLoading, setIsLoading] = useState(false)

    const { auth} = useAuth();

    



    const [value, setValue] = useState('')

    const handleChange = ({ target }) => {


        setValue(target.value)
    }


    useEffect(() => {


        fetchConToken(`inventarios/detail/${idInventario}`, '', '', "GET")
            .then(async (resp) => {

                const body = await resp.json()

                if (!body.ok) return console.log(body);

                setInventario(body.inventario);

                if (body.inventarioDB) {
                    setInventarioDB(body.inventarioDB)
                }




            });

            console.log(inventarioDB)



        fetchConToken(`inventarios/conteo/${idInventario}`, '', '', "GET")
            .then(resp => resp.json())
            .then(body => {
                const { conteos } = body;

                setConteos([...conteos])
            });



    }, [idInventario, conteos]);

    const reset = (conteo, i) => {


        fetchConToken(`inventarios/reset/conteo`, '', { conteo, numeroConteo:i}, "POST")
            .then(async (resp) => {

                const body = await resp.json();

                if (!body.ok) return toast.error(body.msg);

                toast.success(body.msg)


                fetchConToken(`inventarios/conteo/${idInventario}`, '', '', "GET")
                .then(resp => resp.json())
                .then(body => {
                    const { conteos } = body;
    
                    setConteos([...conteos])
                });






            });
    }




 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!value) return toast.error('El conteo no puede ir vacio', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });

        if (!Number(value)) return toast.error('Solo Valores Numericos', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });

        if(inventarioDB.PAUSADO) return toast.error('El Conteo esta pausado', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });

        setIsLoading(true)

        const loadToast = toast.loading('Cargando Registros',{ position: toast.POSITION.TOP_CENTER, });


        const createUpdateInventory =

            fetchConToken("inventarios", '', { inventario, conteo: value }, 'POST')
                .then(resp => resp.json())
                .then(body => {


                    if (!body.ok) {


                        return toast.update(
                            loadToast,
                            {
                                render: body.msg,
                                type: "error",
                                isLoading: false,
                                autoClose: 2000,
                                position: toast.POSITION.TOP_CENTER,
                            }
                        )

                    }

                    const { conteos } = body;


                    setConteos([...conteos])

                    setValue('');

                    setIsLoading(false)

                    toast.update(
                        loadToast,
                        {
                            render: "Registrado exitosamente!! 👌",
                            type: "success",
                            isLoading: false,
                            autoClose: 2000,
                            position: toast.POSITION.TOP_CENTER,
                        }
                    );

                    fetchConToken(`inventarios/detail/${idInventario}`, '', '', "GET")
                    .then(async (resp) => {
        
                        const body = await resp.json()
        
                        if (!body.ok) return console.log(body);
        
                        setInventario(body.inventario);
        
                        if (body.inventarioDB) {
                            setInventarioDB(body.inventarioDB)
                        }
        
        
        
        
                    });


                })
                .catch(console.log)


        // toast.promise(createUpdateInventory,
        //     { pending: 'Guardando', success: 'guardado correctamente 👌', error: 'Hubo un error 🤯' },
        //     { position: toast.POSITION.TOP_CENTER, autoClose: 2000 }
        // )


    }



    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%' }} >

            <Card >
                <CardContent>

                    {
                        inventarioDB?.PAUSADO &&

                        <Typography color="text.secondary" component="h1" sx={{ mb: 3, color: "#ff0000" }} >
                            CONTEO PAUSADO
                        </Typography>

                    }




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

                              

                                    <strong> Conteo {i + 1}: {conteo.cantidad}</strong>


                                <span>

                                    {conteo.name}

                                </span>

                                <span>

                                    <Moment format='DD/MM/YYYY HH:ss ' date={conteo.createdAt} />

                                </span>

                                {
                                    i === conteos.length - 1 &&

                                    <Button onClick={() => reset(conteo, i)} >
                                        Resetear
                                    </Button>


                                }



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
                                    value={value}
                                    type="number"
                                    onChange={handleChange}
                                />

                                <Button
                                    variant='contained'
                                    size="small"
                                    type='submit'
                                    disabled={isLoading || inventarioDB.PAUSADO}
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