
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Box, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import './App.css';
import NavBar from './components/Appbar/NavBar';

import SideBar from './components/SideBar/SideBar';
import Toolbar from '@mui/material/Toolbar';

import TableUi from './components/table/TableUi'
import TableUiSort from './components/table/TableUiSort';

const mdTheme = createTheme();

const App = () => {
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
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%' }} >

            <TableUi />
          </Container>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: '100%' }} >

            <TableUiSort />
          </Container>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: '100%' }} >

            <TableUiSort />
          </Container>


        </Box>




      </Box>

    </ThemeProvider>






  );
}

export default App;
