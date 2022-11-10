import React, { useEffect } from 'react'
import { useContext } from 'react';
import TableContext from '../context/TableContext';
import { fetchSinToken } from '../helpers/fetch';

export const useTable = ({table}) => {


    const { rowsDB, setRowsDB } = useContext(TableContext);


    const [columns, setColumns] = React.useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [fileUploaded, setFileUploaded] = React.useState(false);

    const [search, setSearch] = React.useState('');


    const [count, setCount] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(()=>{

        let controller = new AbortController();

        setIsLoading(true)

        fetchSinToken(table, {page, size:rowsPerPage, search},'','GET',{signal: controller.signal})
            .then( async (resp) =>{

                const body = await resp.json();

                setRowsDB(body.data.rows)

                setCount(body.data.total)

                setIsLoading(false)

            }).catch( e => {

                console.log(e)

                setIsLoading(false)
            })

        return () => controller?.abort()

    },[page,rowsPerPage,search,setRowsDB, table])






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
        rowsDB,
        handleSetTable,
        hadleSetColumns,
        handleSearch,
        columns
    }
}
