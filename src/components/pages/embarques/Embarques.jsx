import {  Container } from '@mui/material'
import React from 'react'
import { TableCollapsible } from '../../table/TableCollapsible'
import { createTheme, ThemeProvider } from '@mui/material/styles';





// const darkTheme = createTheme({
//     palette: {
//       mode: 'light',
//     },
//   });



// import { green, orange } from '@mui/material/colors';

// const outerTheme = createTheme({
//   palette: {
//     primary: {
//       main: orange[500],
//     },
//   },
// });

// const innerTheme = createTheme({
//   palette: {
//     primary: {
//       main: green[500],
//     },
//   },
// });

export const Embarques = () => {
    return (


        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%' }} >

         
                <TableCollapsible></TableCollapsible>
       

        </Container>

    )
}
