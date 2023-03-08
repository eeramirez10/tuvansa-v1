
import { Container, Paper } from '@mui/material'
import React from 'react'
import { useAuth } from '../../../hooks/useAuth';
import SinPermisos from '../../shared/SinPermisos';
import { DimamicTable } from '../../table/DimamicTable'


const Inventarios = () => {

  const { isAllow } = useAuth();

  if (!isAllow) return <SinPermisos />



  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, width: '100%' }} >

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <DimamicTable />
      </Paper>
    </Container>
  )
}

export default Inventarios