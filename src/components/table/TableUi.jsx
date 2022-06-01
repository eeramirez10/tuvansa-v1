
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
import { Box, CircularProgress, Grid, IconButton } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import Input from '../input/Input'

import { styled } from '@mui/material/styles';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ModalMat from '../modal/ModalMat';
import UploadFile from '../shared/UploadFile';
import TableContext from '../../context/TableContext';
import { FormatNumber } from '../../helpers/FormatNumber';
import { ExcelDownload } from '../excel/ExcelDownload';
import { useSearch } from '../../hooks/useSearch';



const Container = styled('div')({
    display: 'flex',
    padding: 9
})





const TableUi = () => {


    const {
        page,
        rowsPerPage,
        count,
        handleChangePage,
        handleChangeRowsPerPage,
        rowsDB: rows,
        handleSetTable,
        hadleSetColumns,
        columns

    } = React.useContext(TableContext);


    const { search, handleSearch } = useSearch();

    const [isLoading, setIsLoading] = React.useState(false);


    const [modalOpen, setModalOpen] = React.useState(false);


    const [factura, setFactura] = React.useState('');




    React.useEffect(() => {

        let controller = new AbortController()

        const fetchItems = async () => {


            console.log(search)

            setIsLoading(true)

            try {
                const response = await getXml(page, rowsPerPage, search, { signal: controller.signal });

                const { data, columns } = response;


                handleSetTable(data.rows, data.total)

                hadleSetColumns(columns)

                setIsLoading(false)

            } catch (error) {
                console.log(error)
            }



        }

        (async () => await fetchItems())();


        return () => {


            return controller?.abort()
        }

    }, [page, rowsPerPage, search])



    const hadleModalOpen = (factura) => {
        setFactura(factura)
        setModalOpen(true)
    }
    const hadleModalClose = () => {

        setModalOpen(false)
    }






    return (

        <>






            <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                <Grid container padding={1} >

                    <Grid item xs={12} md={6}>

                        <Box
                            onSubmit={handleSearch}
                            component="form"
                            sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
                        >

                            <Input
                                label='Buscar'
                                sx={{ width: '50%' }}
                                name="search"
                                variant='outlined'
                                size={'small'}
                            />

                            <IconButton type="submit" sx={{ p: '10px', marginLeft: 1 }} aria-label="search">
                                <SearchIcon />
                            </IconButton>

                        </Box>

                    </Grid>


                    <Grid container xs={12} md={6} direction="row" justifyContent="flex-end" alignItems="center"  >

                        <ExcelDownload dataExport={rows} name={'Gastos'} />

                        <UploadFile />

                    </Grid>


                </Grid>


                {


                    <>

                        <TableContainer sx={{ maxHeight: 562.13 }}>





                            <Table stickyHeader aria-label="sticky table" size="small">

                                <TableHead>


                                    <TableRow>



                                        {columns.map((column) => {

                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            )

                                        }


                                        )
                                        }
                                    </TableRow>





                                </TableHead>

                                {

                                    isLoading
                                        ?

                                        <Paper component={'tbody'} sx={{ width: '0', height: 612.83 }}>
                                            <CircularProgress component={"div"} size={150} style={{ position: 'absolute', left: '50%', top: '35%' }} />

                                        </Paper>

                                        :

                                        <TableBody  >

                                            {




                                                rows

                                                    .map((row) => {


                                                        return (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.uid}>
                                                                {


                                                                    columns.map((column, i) => {
                                                                        const value = row[column.id];



                                                                        return (
                                                                            <TableCell style={{ fontSize: 12 }} key={column.id} align={column.align}>
                                                                                {
                                                                                    column.format && typeof value === 'number'
                                                                                        ? column.format(value)
                                                                                        : column.id === 'pdf' && row[column.id]
                                                                                            ?

                                                                                            <>

                                                                                                <IconButton
                                                                                                    onClick={() => hadleModalOpen(row['pdf'])}
                                                                                                    size="small"
                                                                                                >
                                                                                                    <PictureAsPdfIcon

                                                                                                        sx={{ color: 'green' }}
                                                                                                    />
                                                                                                </IconButton>

                                                                                            </>


                                                                                            : column.id === 'importe' && row[column.id]

                                                                                                ? <FormatNumber number={row[column.id]} />

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

                                }



                            </Table>
                        </TableContainer>

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



            </Paper>



            <ModalMat modalOpen={modalOpen} hadleModalClose={hadleModalClose} fileName={factura} type={'gastos'} />




        </>



    );
}

export default TableUi