import * as React from 'react';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { getEmbarques } from '../../services/compras';
import { Chip, CircularProgress, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Tooltip from '@mui/material/Tooltip';


import styled from '@emotion/styled';
import UploadFile from '../shared/UploadFile';
import ModalMat from '../modal/ModalMat';
import TableContext from '../../context/TableContext';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





function Row({ row }) {


    const [open, setOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [factura, setFactura] = React.useState('');

    const hadleModalOpen = (factura) => {
        setFactura(factura)
        setModalOpen(true)
    }
    const hadleModalClose = () => {

        setModalOpen(false)
    }

    return (

        <>

            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {
                            row.detalle.length > 1 ?
                                open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                                : ''
                        }


                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">{row.factura}</TableCell>
                <TableCell >{row.remision}</TableCell>
                <TableCell >{row.ruta}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell >


                    <Tooltip title={row.nombreCliente} placement="top" style={{ cursor: 'pointer' }}>
                        <span>
                            {row.nombreCliente.slice(0, 7)}...

                        </span>

                    </Tooltip>
                </TableCell>
                <TableCell >{row.agente}</TableCell>

                <TableCell align="right">$ {row.costo}</TableCell>
                <TableCell align="right">
                    {
                        row.estado === 'OK' ?
                            <Chip label="Entregado" color="success" size="small" /> :
                            <Chip label="Pendiente" color="warning" size="small" />
                    }

                </TableCell>
                <TableCell >{row.estado === 'OK' ? row.fechaFolio : ''}</TableCell>
                <TableCell >{row.referencia}</TableCell>
                <TableCell>

                    {
                        row.pdf &&

                        <IconButton
                            onClick={() => hadleModalOpen(row.pdf)}
                            size="small"
                        >
                            <PictureAsPdfIcon

                                sx={{ color: 'green' }}
                            />
                        </IconButton>
                    }

                </TableCell>

                <TableCell>
                    
                    <UploadFile name={row.ruta} />

                </TableCell>

            </TableRow>


            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>


                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow >
                                        <StyledTableCell>Factura</StyledTableCell>
                                        <StyledTableCell>Remision</StyledTableCell>
                                        {/* <TableCell align="right">Ruta</TableCell> */}
                                        <StyledTableCell align="right">Costo ($)</StyledTableCell>
                                        {/* <TableCell align="right">Folio</TableCell> */}
                                        <StyledTableCell align="right">Referencia</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.detalle.map((detalle) => (
                                        <TableRow hover key={detalle.factura}>
                                            <TableCell component="th" scope="row">
                                                {detalle.factura}
                                            </TableCell>
                                            <TableCell>{detalle.remision}</TableCell>
                                            {/* <TableCell align="right">{detalle.druta}</TableCell> */}
                                            <TableCell align="right">
                                                $ {detalle.costo}
                                            </TableCell>
                                            {/* <TableCell align="right">
                                                    {detalle.folio}
                                                </TableCell> */}
                                            <TableCell align="right">
                                                {detalle.referencia}
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>



                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>


            <ModalMat modalOpen={modalOpen} hadleModalClose={hadleModalClose} fileName={factura} type={'embarques'} />

        </>






    );
}




export const TableCollapsible = () => {


    const {
        page,
        rowsPerPage,
        search,
        isLoading,
        count,
        handleChangePage,
        handleChangeRowsPerPage,
        rowsDB
    } = React.useContext(TableContext);




    return (
        <TableContainer component={Paper}>

            {


                <>

                    <Table aria-label="collapsible table" size="small"  >

                        <TableHead>
                            <TableRow>
                                <StyledTableCell />
                                <StyledTableCell>Factura</StyledTableCell>
                                <StyledTableCell >Remision</StyledTableCell>
                                <StyledTableCell >Ruta</StyledTableCell>
                                <StyledTableCell >Fecha</StyledTableCell>
                                <StyledTableCell >Cliente</StyledTableCell>
                                <StyledTableCell >Agente</StyledTableCell>
                                <StyledTableCell align="right">Costo</StyledTableCell>
                                <StyledTableCell >Estado</StyledTableCell>
                                <StyledTableCell >Fecha Entrega</StyledTableCell>
                                <StyledTableCell >Referencia</StyledTableCell>
                                <StyledTableCell >File</StyledTableCell>
                                <StyledTableCell >Upload</StyledTableCell>
                            </TableRow>
                        </TableHead>


                        {
                            isLoading
                                ?

                                <Paper sx={{ width:'0',   height:612.83 }}>

                                    < CircularProgress size={150} style={{ position: 'absolute', left: '50%', top: '35%' }} />
                                </Paper>


                                :

                                <TableBody>
                                    {rowsDB.map((row) => (

                                        <Row key={row.ruta} row={row} />
                                    ))}
                                </TableBody>

                        }



                    </Table>

                    {

                        !isLoading &&

                        <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    }



                </>


            }


        </TableContainer>
    )
}
