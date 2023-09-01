import React from 'react'
import { Switch, Route, Link } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';

import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../../Appbar/NavBar';
import SideBar from '../../SideBar/SideBar'

import Gastos from '../../../components/pages/gastos/Gastos';
import Charts from '../../../components/pages/charts/Charts';

import { Embarques } from '../embarques/Embarques';

import { TableProvider } from '../../../context/TableContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import esLocale from 'date-fns/locale/es'
import Inventarios from '../inventarios/Inventarios';
import InventarioDetalle from '../inventarios/InventarioDetalle';
import { ChartProvider } from '../../../context/ChartContext';
import ChartsBi from '../chartsbi/ChartsBi';

const mdTheme = createTheme();

const Home = () => {



  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen = null) => {
    setOpen(isOpen ? isOpen : !open);
  }
  return (

    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }} >
        <CssBaseline />
        <NavBar open={open} toggleDrawer={toggleDrawer} />
        <SideBar open={open} toggleDrawer={toggleDrawer} sx={{ display: 'none' }} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',

          }}

        >
          <Toolbar />




          <Switch>


            <TableProvider>


              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale} >

                <ChartProvider>

                  <Route exact path="/charts" component={Charts} title="Charts" />

                  <Route exact path="/chartsbi" component={ChartsBi} title="Charts" />
                  
                </ChartProvider>

                



                <Route path="/gastos" component={Gastos} />
                <Route path="/embarques" component={Embarques} />



                <Route path="/inventarios" component={Inventarios} />

                <Route path="/inventario/detail/:idInventario" component={InventarioDetalle} />

              </LocalizationProvider>


            </TableProvider>







          </Switch>




        </Box>
      </Box>
    </ThemeProvider >
  )
}

export default Home