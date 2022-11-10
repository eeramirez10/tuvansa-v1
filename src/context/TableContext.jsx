import React, { createContext, useMemo, useState } from 'react'
import { getEmbarques } from '../services/compras';


const TableContext = createContext();

export const TableProvider = ({ children }) => {

    const [rowsDB, setRowsDB] = React.useState([]);

  


    return (
        <TableContext.Provider value={{rowsDB, setRowsDB}} >  {children} </TableContext.Provider>
    )




}

export default TableContext;