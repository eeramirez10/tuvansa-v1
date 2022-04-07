
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getXml } from '../../services/compras';
import { Box, CircularProgress, IconButton } from '@mui/material';

import Input from '../input/Input'

import { styled } from '@mui/material/styles';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ModalMat from '../modal/ModalMat';
import UploadFile from '../shared/UploadFile';



const Container = styled('div')({
    display: 'flex',
    padding: 9
})





const TableUi = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [columns, setColumns] = React.useState([]);
    const [rows, setRows] = React.useState([])
    const [count, setCount] = React.useState(0);

    const [modalOpen, setModalOpen] = React.useState(false);

    const [isLoading, setIsloading] = React.useState(false);

    const [factura, setFactura] = React.useState('');

    const [search, setSearch] = React.useState('');


    React.useEffect(() => {

        setIsloading(true)

        getXml(page, rowsPerPage, search)
            .then(({ data, columns }) => {

                setColumns(columns)

                setRows(data.rows);

                setCount(data.total)

                if (data.rows) {
                    setIsloading(false)
                }

            })

    }, [page, rowsPerPage, search])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setIsloading(true)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const hadleModalOpen = (factura) => {
        setFactura(factura)
        setModalOpen(true)
    }
    const hadleModalClose = () => {

        setModalOpen(false)
    }

    const hadleInputChange = ({ target }) => {

        const value = target.value;

        if (value.length > 2) {
            setSearch(value)
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        setSearch(data.get('search'))



    }





    return (

        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                <Container >

                    <Box onSubmit={handleSubmit} component="form"  style={{ width:'100%'}}>

                        <Input
                            label='search'
                            sx={{ marginTop: 1, width: '20%', }}
                            name="search"
                            
                        />

                    </Box>



                </Container>



                <TableContainer sx={{ maxHeight: 600 }}>



                    <Table stickyHeader aria-label="sticky table" size="small">

                        <TableHead>


                            <TableRow>



                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody  >

                            {


                                isLoading ?

                                    <CircularProgress size={150} style={{ position: 'relative', marginLeft: '200%', marginTop: 50 }} />

                                    :

                                    rows

                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {


                                                        columns.map((column) => {
                                                            const value = row[column.id];



                                                            return (
                                                                <TableCell style={{ fontSize: 12 }} key={column.id} align={column.align}>
                                                                    {
                                                                        column.format && typeof value === 'number'
                                                                            ? column.format(value)
                                                                            : column.id === 'pdf' && row[column.id]
                                                                                ?
                                                                                <IconButton
                                                                                    onClick={() => hadleModalOpen(row['pdf'])}
                                                                                    size="small"
                                                                                >
                                                                                    <PictureAsPdfIcon

                                                                                        sx={{ color: 'green' }}
                                                                                    />
                                                                                </IconButton>

                                                                                : value


                                                                    }
                                                                </TableCell>
                                                            );
                                                        })}
                                                </TableRow>
                                            );
                                        })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>


                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <ModalMat modalOpen={modalOpen} hadleModalClose={hadleModalClose} factura={factura} />


            <UploadFile />

        </>



    );
}

export default TableUi