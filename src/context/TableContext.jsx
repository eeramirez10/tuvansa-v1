import React, { createContext } from 'react'



const TableContext = createContext();

export const TableProvider = ({ children }) => {

    const [rowsDB, setRowsDB] = React.useState([]);

  


    return (
        <TableContext.Provider value={{rowsDB, setRowsDB}} >  {children} </TableContext.Provider>
    )




}

export default TableContext;