
import { Container, Paper } from '@mui/material'
import React from 'react'
import { DimamicTable } from '../../table/DimamicTable'


const Inventarios = () => {



  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%' }} >

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <DimamicTable />
      </Paper>
    </Container>
  )
}

export default Inventarios