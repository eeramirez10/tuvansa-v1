
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
import { CircularProgress, IconButton } from '@mui/material';
import Input from '../input/Input';
import { styled } from '@mui/material/styles';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ModalMat from '../modal/ModalMat';
import UploadButton from '../button/UploadButton';
import { style } from '@mui/system';


// const columns = [
//     { id: 'name', label: 'Name', minWidth: 170 },
//     { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//     {
//         id: 'population',
//         label: 'Population',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'size',
//         label: 'Size\u00a0(km\u00b2)',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'density',
//         label: 'Density',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toFixed(2),
//     },
// ];

const Container = styled('div')({
    display: 'flex',
    padding: 9
})

const UploadContainer = styled('div')({
    display: 'flex',
    marginTop: 30
})



const TableUi = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        setFactura('')
        setModalOpen(false)
    }

    const hadleInputChange = ({ target }) => {
        setSearch(target.value)
    }





    return (

        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                <Container >
                    <Input
                        label='search'
                        sx={{ marginTop: 1, width: '100%', padding: 1 }}
                        onChange={hadleInputChange}
                    />
                    <UploadButton />

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

                                    <CircularProgress size={150} />

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

            <UploadContainer>
                <UploadButton />
            </UploadContainer>

        </>



    );
}

export default TableUi