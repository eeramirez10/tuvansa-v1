import React, { createContext, useMemo, useState } from 'react'
import { getEmbarques } from '../services/compras';


const TableContext = createContext();

export const TableProvider = ({ children }) => {

    const [rowsDB, setRowsDB] = React.useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [fileUploaded, setFileUploaded] = React.useState(false);

    const [search, setSearch] = React.useState('');


    const [count, setCount] = React.useState(0);

    const [isLoading, setIsLoading] = React.useState(true)


    React.useEffect(() => {

        let controller = new AbortController()

        const fetchItems = async () => {


            const response = await getEmbarques(page, rowsPerPage, search, { signal: controller.signal });

            setRowsDB(response.rows);
            setCount(response.total)

            setIsLoading(false)


        }

        (async () => await fetchItems())()

        return () => controller?.abort()

    }, [page, rowsPerPage, search, fileUploaded])



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setIsLoading(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


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

        
        rowsDB

    }




    return (
        <TableContext.Provider value={value} >  {children} </TableContext.Provider>
    )




}

export default TableContext;