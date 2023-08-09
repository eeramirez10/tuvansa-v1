import React, { useContext, useState } from 'react'
import ChartContext from '../context/ChartContext'


export const useCharts = () => {

    const { data, setData } = useContext(ChartContext)

    const [isLoading, setIsLoading] = useState(true);


    

    const setSucursalData = (sucursal) => {

        console.log(data)
        setData(sucursal)
        
    }

    const setSucursalAnoData = async () => {
 

       console.log(data)
    }
    



    return {
        data,
        setSucursalData,
        setIsLoading,
        isLoading
    }
}
