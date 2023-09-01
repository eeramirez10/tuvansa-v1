import React, { useEffect, useState } from 'react'
import { useCharts } from '../../hooks/useCharts';
import { getSucursalesVentas, getVentaAnualSucursal } from '../../services/charts';
import BasicLine from '../shared/charts/BasicLine';
import { Box, Button, Container, Skeleton } from '@mui/material';
import { SelectUI } from '../shared/SelectUI';
import { error } from 'highcharts';


const lineOptions = {
    title: {
        text: 'Ventas Sucursales '
    },

    subtitle: {
        text: 'Clickea en un punto para ver el detalle'
    },



    yAxis: {
        title: {
            text: ''
        }
    },

    xAxis: {
        type: 'category',
        categories: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",

        ]

    },

    // legend: {
    //     layout: 'vertical',
    //     align: 'right',
    //     verticalAlign: 'middle'
    // },






    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
};

const sucursales = [
    { name: "Mexico", value: 1 },
    { name: "Monterrey", value: 2 },
    { name: "Veracruz", value: 3 },
    { name: "Mexicali", value: 4},
    { name: "Queretaro", value: 5 },
    { name: "Cancun", value: 6 },
]




const VentaSucursales = () => {

    const [options, setOptions] = useState(lineOptions);
    const [year, setYear] = useState("")
    const { setSucursalData,  setIsLoading, isLoading } = useCharts()



    const [sucursal, setSucursal] = React.useState('');

    const handleChange = (event) => {
        setSucursal(event.target.value);
        console.log(sucursal)
    };


    useEffect(() => {

        if (sucursal) {

            setIsLoading(true)


            getVentaAnualSucursal({ sucursal })
                .then(({ data, sucursal }) => {

                    console.log(data)

                    setOptions(o => ({
                        ...o,
                        title: {
                            text: `Ventas anuales ${sucursal} `
                        },
                        series: [
                            ...data,
                            // {
                            //     name:"",
                            //     data:[null,null,null,null,null,null,null,null,null,null,null,null]
                            // }
                        ]

                    }))


                    setIsLoading(false)


                })
                .catch( error => {
                    console.log(error)
                    setIsLoading(false)

                })
                .finally(() => setIsLoading(false))


        }



    }, [sucursal])




    useEffect(() => {

        setIsLoading(true)

        getSucursalesVentas()
            .then(({ data }) => {


                setYear(data[0].data[0].year)

                console.log(data)

                setOptions(o => ({
                    ...o,
                    title: {
                        text: `Ventas Sucursales - ${data[0].data[0].year}`
                    },
                    series: [
                        ...data,
                        // {
                        //     name:"",
                        //     data:[null,null,null,null,null,null,null,null,null,null,null,null]
                        // }
                    ]

                }))

                setIsLoading(false)



            })

    }, [])


    const handleOnClick = ({ point }) => {

      

        const { name: month, series, color } = point;

      

        const { name } = series;

       



        setSucursalData({ month, name: sucursal ? sucursal : name , color, year })

    }

    const handleClickSucursal = async () => {

        setIsLoading(true)

      
        setSucursal("")
        getSucursalesVentas()
            .then(({ data }) => {

                console.log(data)


                setYear(data[0].data[0].year)

                console.log(data)

                setOptions(o => ({
                    ...o,
                    title: {
                        text: `Ventas Sucursales - ${data[0].data[0].year}`
                    },
                    series: [
                        ...data,
                        // {
                        //     name:"",
                        //     data:[null,null,null,null,null,null,null,null,null,null,null,null]
                        // }
                    ]

                }))

                setIsLoading(false)



            })



    }



    return (

        <>
            {
                isLoading ?

                    <Skeleton variant="rectangular" width={600} height={400} />

                    :

                    <>

                        <Box sx={{ width:"10", display: "flex", justifyContent: "space-between", alignContent:"center", background: "#fff" }}>

                            <Button variant="contained" size="small" onClick={handleClickSucursal}>Ventas Sucursales</Button>


                            <SelectUI label="Sucursales" value={sucursal} options={sucursales} handleChange={handleChange} />




                        </Box>


                        <BasicLine options={options} handleOnClick={handleOnClick} />

                    </>

            }




        </>

    )
}

export default VentaSucursales