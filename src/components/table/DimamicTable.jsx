import { Button, CircularProgress, Grid, IconButton, Paper, Table } from '@mui/material'
import { Box } from '@mui/system'
import React, { useRef } from 'react'
import Input from '../input/Input';
import SearchIcon from '@mui/icons-material/Search';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTable } from '../../hooks/useTable';
import { useHistory } from 'react-router-dom';
import QrToPrintInventario from '../pages/inventarios/QrToPrintInventario';
import { useReactToPrint } from 'react-to-print';
import { useEffect } from 'react';

const columns = [
    { id: "ISEQ", label: 'iseq', minWidth: 170, align: 'left', },
    { id: "ICOD", label: 'codigo', minWidth: 170, align: 'right' },
    { id: "IEAN", label: 'ean', minWidth: 170, align: 'right' },
    { id: "I2DESCR", label: 'descripcion', minWidth: 170, align: 'right' },
    { id: "ALMCANT", label: 'cantidad', minWidth: 170, align: 'right' },
    { id: "ACCIONES", label: 'acciones', minWidth: 170, align: 'right' },
];



export const DimamicTable = () => {

    const history = useHistory()

    const {
        rowsDB,
        count,
        rowsPerPage,
        page,
        handleChangePage,
        handleChangeRowsPerPage,
        isLoading,
        row,
        handleRow
    } = useTable({ table: 'inventarios' });




    const componetRef = useRef(null);


    const handlePrint = useReactToPrint({
        content: () => componetRef.current,
        onAfterPrint: () => handleRow(),
        documentTitle: "",
        // pageStyle: `
        // @page {
        //     size: auto;

        //   }

        //   @media all {
        //     .pagebreak {
        //       display: none;
        //     }
        //   }

        //   @media print {
        //     .pagebreak {
        //       page-break-before: always;
        //     }
        //   }

        // `,
        removeAfterPrint: true,
        copyStyles: true

    })



    useEffect(() => {


        if (row.length > 0) {


            handlePrint()
        }


    }, [row, handlePrint])





    return (
        <>
            <SearchTable />

            <Button variant='contained' style={{ display: 'block', margin: '0 auto' }} onClick={() => handleRow(rowsDB)} > Imprimir vista </Button>

            {
                isLoading
                    ?

                    <Paper sx={{ width: '0', height: 562.13 }}>
                        <CircularProgress component={"div"} size={150} style={{ position: 'absolute', left: '50%', top: '35%' }} />

                    </Paper>

                    :
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


                                        )}
                                    </TableRow>





                                </TableHead>

                                {



                                    <TableBody  >

                                        {


                                            rowsDB.map((row) => {


                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.ISEQ} >
                                                        {

                                                            columns.map((column, i) => {
                                                                const value = row[column.id];
                                                                return (
                                                                    <TableCell
                                                                        style={{ fontSize: 12 }}
                                                                        key={column.id}
                                                                        align={column.align}
                                                                        onDoubleClick={() => { history.push(`/inventario/detail/${row.ISEQ}`) }}
                                                                    >
                                                                        {
                                                                            column.format && typeof value === 'number'
                                                                                ? column.format(value)
                                                                                :

                                                                                column.id === "ACCIONES" ?
                                                                                    <Button
                                                                                        onClick={() => {

                                                                                            handleRow([row]);

                                                                                        }}
                                                                                    > Imprimir </Button>
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


                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            component="div"
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />




                    </>



            }


            {

                (row.length > 0) &&


                < QrToPrintInventario componetRef={componetRef} inventarios={row} />
            }




        </>
    )
}

const SearchTable = () => {

    const {
        handleSearch
    } = useTable({ table: 'inventarios' });

    return (

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


            <Grid container item xs={12} md={6} direction="row" justifyContent="flex-end" alignItems="center"  >

                {/* <ExcelDownload dataExport={rows} name={'Gastos'} /> */}

                {/* <UploadFile /> */}

            </Grid>


        </Grid>


    )

}
