import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useCharts } from '../../../hooks/useCharts'
import { getSucursalesVentas } from '../../../services/charts';
import { Button } from '@mui/material';


// const lineOptions = {
//     title: {
//         text: 'Ventas Sucursales '
//     },

//     subtitle: {
//         text: 'Clickea en un punto para ver el detalle'
//     },


//   yAxis: {
//         title: {
//             text: ''
//         }
//     },

//     xAxis: {
//         type: 'category'
//     },

//     // legend: {
//     //     layout: 'vertical',
//     //     align: 'right',
//     //     verticalAlign: 'middle'
//     // },




//     responsive: {
//         rules: [{
//             condition: {
//                 maxWidth: 500
//             },
//             chartOptions: {
//                 legend: {
//                     layout: 'horizontal',
//                     align: 'center',
//                     verticalAlign: 'bottom'
//                 }
//             }
//         }]
//     }
// };


const BasicLine = ({ options, handleOnClick }) => {




    return (

        <>

          

            <HighchartsReact highcharts={Highcharts} options={{
                ...options, plotOptions: {
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
                }
            }} />



        </>

    )
}

export default BasicLine