import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {  useCharts } from '../../../hooks/useCharts'
import { getSucursalesVentas } from '../../../services/charts';


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
        type: 'category'
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


const BasicLine = (prop) => {

    const [options, setOptions] = useState(lineOptions);
    const [year, setYear] = useState("")
    const { setSucursalData } = useCharts()




    useEffect(() => {


        getSucursalesVentas()
        .then(({ data }) => {

       

        
            setYear(data[0].data[0].year)



            setOptions( o => ({
                ...o,
                title:{
                    text: `Ventas Sucursales - ${data[0].data[0].year}`
                },
                series: data

            }))

          

        })

  




    }, [])

    const handleOnClick  = ({ point }) => {


        const { name:month, series, color } = point;

        const { name } = series;

    
        setSucursalData({month, name, color, year})

    }





    return (
        <HighchartsReact highcharts={Highcharts} options={{...options,     plotOptions: {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true
            },
            series: {
                events: {
                    click: handleOnClick
                }
            }
        }}} />
    )
}

export default BasicLine