import React, { createContext, useState } from 'react'

const ChartContext = createContext();

export const ChartProvider = ({ children }) => {

    const [data, setData] = useState({});


    return <ChartContext.Provider  value ={{ data, setData }} > { children } </ChartContext.Provider>
}



export default ChartContext