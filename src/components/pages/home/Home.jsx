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
import { useRouteMatch } from 'react-router-dom';
import { Embarques } from '../embarques/Embarques';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { TableProvider } from '../../../context/TableContext';


const mdTheme = createTheme();

const Home = () => {



  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  }
  return (

    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }} >
        <CssBaseline />
        <NavBar open={open} toggleDrawer={toggleDrawer} />
        <SideBar open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}

        >
          <Toolbar />




          <Switch>

            <TableProvider>

              <Route path="/charts" component={Charts} title="Charts" />


              <Route path="/gastos" component={Gastos} />

              <Route path="/embarques" component={Embarques} />


            </TableProvider>







          </Switch>




        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Home