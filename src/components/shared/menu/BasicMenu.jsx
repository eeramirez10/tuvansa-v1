import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { RangePicker } from '../datePicker/RangePicker';
import { Box, Grid } from '@mui/material';
import { ExcelDownload } from '../../excel/ExcelDownload';

export const BasicMenu = ({ title }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [fechas, setFechas] = React.useState({
        inicio:null,
        final:null
    })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFechas = (name, value) =>{

        setFechas({ ...fechas, [name]:value })
    }

    console.log(fechas)


    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="contained"
            >
                {title}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Box component="div" sx={{  p:2,  }}  >

                    <Grid container spacing={1}   >

                        <Grid  item md={6} xs={12} sx={{display:'flex',}} >
                            <RangePicker 
                                label="Inicio" 
                                sx={{ margin:'0 auto', width:'100%'}} 
                                size="small" 
                                name = "inicio"
                                handleFechas={handleFechas}
                                value={ fechas.inicio}
                            />
                        </Grid>
                        <Grid item md={6} xs={12} sx={{display:'flex'}} >
                            <RangePicker 
                                label="Final" 
                                sx={{ margin:'0 auto', width:'100%'}} 
                                size="small" 
                                name="final"
                                handleFechas={handleFechas}
                                value={ fechas.final}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}  sx={{display:'flex'}}>
                            <ExcelDownload 
                                sx={{ margin:'0 auto', width:'100%'}} 
                                size="small" 
                            />
                        </Grid>


                    </Grid>

                </Box>

            </Menu>
        </div>
    )
}
