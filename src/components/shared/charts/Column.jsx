import React, { useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Drilldown from 'highcharts/modules/drilldown';
import { getVendedoresVentas } from '../../../services/charts';
import { useCharts } from '../../../hooks/useCharts';
import { CircularProgress, Paper, Skeleton } from '@mui/material';

Drilldown(Highcharts);

let sucursal = '';

let initialOptions = {
    chart: {
        type: 'column',
        // events: {
        //     click: function (event) {
        //         alert("clicked column");
        //     }
        // }
    },
    title: {
        text: 'Browser market shares. January, 2018'
    },
    subtitle: {
        text: ''
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: ''
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {

        series: {

            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '${point.y:,.0f}'
            },
            point: {
                // events: {
                //     click: function () {
                //         console.log(this)
                //     }
                // }
            },
            events: {
                // click: function ({point}){
                //     console.log(point.name)
                //     sucursal = point.name;
                // }
            }

        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:,.0f}</b><br/>'
    },

    series: [
        {
            color: "#434348",
            name: "Ventas",
            colorByPoint: true,
            data: [
                // {
                //     name: "Mexico",
                //     y: 62.74,
                //     drilldown: "Mexico"
                // },

            ]
        }
    ],
    // drilldown: {
    //     breadcrumbs: {
    //         position: {
    //             align: 'right'
    //         }
    //     },
    //     series: [
    //         {
    //             name: "Mexico",
    //             id: "Mexico",
    //             data: [{name:"test", y:2345} ]
    //         },
    //     ]
    // }
}

const Column = ({height, width }) => {

    const [options, setOptions] = useState(initialOptions);

    const { data: sucursal, isLoading, setIsLoading } = useCharts()



    const ref = useRef(null);

    useEffect(() => {

        console.log(ref.current)

        

        if (sucursal) {

           

            console.log(sucursal)


            setIsLoading(true)

            const sucursales = {
                Mexico: 1,
                Monterrey: 2,
                Veracruz: 3,
                Mexicali: 4,
                Queretaro: 5,
                Cancun: 6,

            }


            const nombreSucursal = sucursal.name;


            if (!nombreSucursal) return;



            getVendedoresVentas(sucursales[nombreSucursal], sucursal.month, sucursal.year)
                .then(({ data }) => {

                    setIsLoading(false)

                    setOptions({
                        ...options,
                        title:{
                            text: `Ventas por Agente - ${sucursal.name} ${sucursal.month}, ${sucursal.year}`

                        },


                        series: [
                            {
                                color: sucursal.color,
                                name: "Ventas",
                                colorByPoint: false,
                                data: data.data
                            }
                        ],

                    })


                })



        }
       






    }, [sucursal])



    return (

        <>


            {


                sucursal?.name ?



                    isLoading ?


                        // < CircularProgress size={150} sx={{ left: "45%", top: "50%", position: "absolute" }} />

                        <Skeleton variant="rectangular" width={width} height={height}  />




                        :


                        <HighchartsReact
                            highcharts={Highcharts}

                            
                            options={{
                                ...options, 

                                
                                plotOptions: {
                                    series: {
                                        events: {
                                            click: function ({ point }) {


                                            }
                                        }
                                    }
                                }
                            }} ref={ref} />

                    : ""



            }











        </>





    )
}

export default Column