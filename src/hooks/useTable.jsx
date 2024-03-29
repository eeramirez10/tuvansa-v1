import { ImportContactsOutlined } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { toast } from 'react-toastify';
import TableContext from '../context/TableContext';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';

export const useTable = ({ table }) => {


    const { rowsDB, setRowsDB } = useContext(TableContext);



    const [columns, setColumns] = React.useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [fileUploaded, setFileUploaded] = React.useState(false);

    const [search, setSearch] = React.useState('');

    const [row, setRow] = React.useState([])


    const [count, setCount] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {

        let controller = new AbortController();

        setIsLoading(true)

         fetchConToken(table, { page, size: rowsPerPage, search }, '', 'GET', { signal: controller.signal })
            .then(resp => resp.json())
            .then(async (body) => {



                // console.log(body.data.total)
                setIsLoading(false);

                if (!body.ok && !body.token) {

                    

                    return toast.error("Debe de iniciar sesion nuevamente");


                }

                if(!body.ok){
                    return toast.error("Hubo un error, hable con el administrador");
                }

                setRowsDB(body.data.rows)

                setCount(body.data.total)

                setIsLoading(false)

            }).catch(e => {

                console.log(e)

                setIsLoading(false)
            })

        return () => controller?.abort()

    }, [page, rowsPerPage, search, setRowsDB, count, table])








    const handleSetTable = (rows, total) => {

        setRowsDB(rows);
        setCount(total)

        setIsLoading(false)


    }

    const hadleSetColumns = (columns) => {
        setColumns(columns)
    }




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setIsLoading(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);

        setSearch(data.get('search'))



    }

    const handleRow = (row) => {
        setRow(row ? row : [])

    }

    return {
        page,
        rowsPerPage,
        search,
        fileUploaded,
        count,
        isLoading,
        handleChangePage,
        handleChangeRowsPerPage,
        setFileUploaded,
        handleRow,
        row,
        rowsDB,
        handleSetTable,
        hadleSetColumns,
        handleSearch,
        columns
    }
}
