import React, { createContext, useMemo, useState } from 'react'
import { getEmbarques } from '../services/compras';


const TableContext = createContext();

export const TableProvider = ({ children }) => {

    const [rowsDB, setRowsDB] = React.useState([]);

    const [columns, setColumns] = React.useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [fileUploaded, setFileUploaded] = React.useState(false);

    const [search, setSearch] = React.useState('');


    const [count, setCount] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(true)


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




    const value = {
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




    return (
        <TableContext.Provider value={value} >  {children} </TableContext.Provider>
    )




}

export default TableContext;