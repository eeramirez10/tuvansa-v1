import React, { useEffect, useState } from 'react'
import { useCharts } from '../../hooks/useCharts';
import { getSucursalesVentas } from '../../services/charts';
import BasicLine from '../shared/charts/BasicLine';


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
            'Ene',
            'Feb',
            'Mar',
            'Abr',
            'May',
            'Jun',
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
            
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




const VentaSucursales = () => {

    const [options, setOptions] = useState(lineOptions);
    const [year, setYear] = useState("")
    const { setSucursalData } = useCharts()


    useEffect(() => {


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
                        {
                            name:"",
                            data:[null,null,null,null,null,null,null,null,null,null,null,null]
                        }
                    ]

                }))



            })

    }, [])


    const handleOnClick = ({ point }) => {


        const { name: month, series, color } = point;

        const { name } = series;


        setSucursalData({ month, name, color, year })

    }




    return (
        <BasicLine options={options} handleOnClick={handleOnClick} />
    )
}

export default VentaSucursales