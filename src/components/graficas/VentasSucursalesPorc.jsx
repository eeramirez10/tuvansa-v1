import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useCharts } from '../../hooks/useCharts';
import { getSucursalesVentas } from '../../services/charts';
import { Pie } from '../shared/charts/Pie'


const initialOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },

    accessibility: {
        announceNewData: {
            enabled: true
        },
        point: {
            valueSuffix: '%'
        }
    },

    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.percentage:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:,.0f}</b> of total<br/>'
    },

    series: [
        {
            name: "Browsers",
            colorByPoint: true,
            data: []
        }
    ],
    // drilldown: {
    //     series: [
    //         {
    //             name: "Chrome",
    //             id: "Chrome",
    //             data: [
    //                 [
    //                     "v65.0",
    //                     0.1
    //                 ],
    //                 [
    //                     "v64.0",
    //                     1.3
    //                 ],
    //                 [
    //                     "v63.0",
    //                     53.02
    //                 ],
    //                 [
    //                     "v62.0",
    //                     1.4
    //                 ],
    //                 [
    //                     "v61.0",
    //                     0.88
    //                 ],
    //                 [
    //                     "v60.0",
    //                     0.56
    //                 ],
    //                 [
    //                     "v59.0",
    //                     0.45
    //                 ],
    //                 [
    //                     "v58.0",
    //                     0.49
    //                 ],
    //                 [
    //                     "v57.0",
    //                     0.32
    //                 ],
    //                 [
    //                     "v56.0",
    //                     0.29
    //                 ],
    //                 [
    //                     "v55.0",
    //                     0.79
    //                 ],
    //                 [
    //                     "v54.0",
    //                     0.18
    //                 ],
    //                 [
    //                     "v51.0",
    //                     0.13
    //                 ],
    //                 [
    //                     "v49.0",
    //                     2.16
    //                 ],
    //                 [
    //                     "v48.0",
    //                     0.13
    //                 ],
    //                 [
    //                     "v47.0",
    //                     0.11
    //                 ],
    //                 [
    //                     "v43.0",
    //                     0.17
    //                 ],
    //                 [
    //                     "v29.0",
    //                     0.26
    //                 ]
    //             ]
    //         },
    //         {
    //             name: "Firefox",
    //             id: "Firefox",
    //             data: [
    //                 [
    //                     "v58.0",
    //                     1.02
    //                 ],
    //                 [
    //                     "v57.0",
    //                     7.36
    //                 ],
    //                 [
    //                     "v56.0",
    //                     0.35
    //                 ],
    //                 [
    //                     "v55.0",
    //                     0.11
    //                 ],
    //                 [
    //                     "v54.0",
    //                     0.1
    //                 ],
    //                 [
    //                     "v52.0",
    //                     0.95
    //                 ],
    //                 [
    //                     "v51.0",
    //                     0.15
    //                 ],
    //                 [
    //                     "v50.0",
    //                     0.1
    //                 ],
    //                 [
    //                     "v48.0",
    //                     0.31
    //                 ],
    //                 [
    //                     "v47.0",
    //                     0.12
    //                 ]
    //             ]
    //         },
    //         {
    //             name: "Internet Explorer",
    //             id: "Internet Explorer",
    //             data: [
    //                 [
    //                     "v11.0",
    //                     6.2
    //                 ],
    //                 [
    //                     "v10.0",
    //                     0.29
    //                 ],
    //                 [
    //                     "v9.0",
    //                     0.27
    //                 ],
    //                 [
    //                     "v8.0",
    //                     0.47
    //                 ]
    //             ]
    //         },
    //         {
    //             name: "Safari",
    //             id: "Safari",
    //             data: [
    //                 [
    //                     "v11.0",
    //                     3.39
    //                 ],
    //                 [
    //                     "v10.1",
    //                     0.96
    //                 ],
    //                 [
    //                     "v10.0",
    //                     0.36
    //                 ],
    //                 [
    //                     "v9.1",
    //                     0.54
    //                 ],
    //                 [
    //                     "v9.0",
    //                     0.13
    //                 ],
    //                 [
    //                     "v5.1",
    //                     0.2
    //                 ]
    //             ]
    //         },
    //         {
    //             name: "Edge",
    //             id: "Edge",
    //             data: [
    //                 [
    //                     "v16",
    //                     2.6
    //                 ],
    //                 [
    //                     "v15",
    //                     0.92
    //                 ],
    //                 [
    //                     "v14",
    //                     0.4
    //                 ],
    //                 [
    //                     "v13",
    //                     0.1
    //                 ]
    //             ]
    //         },
    //         {
    //             name: "Opera",
    //             id: "Opera",
    //             data: [
    //                 [
    //                     "v50.0",
    //                     0.96
    //                 ],
    //                 [
    //                     "v49.0",
    //                     0.82
    //                 ],
    //                 [
    //                     "v12.1",
    //                     0.14
    //                 ]
    //             ]
    //         }
    //     ]
    // }
}

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];



const d = new Date();
let month = d.getMonth()


const VentasSucursalesPorc = () => {

    const [options, setOptions] = useState(initialOptions);

    const { data:sucursal } = useCharts()

   

    
    useEffect(() => {

   

        getSucursalesVentas()
            .then(({ data }) => {


                console.log(sucursal.month)

                let monthData = data.map( suc =>(
                    [suc.name,
                    suc.data.filter( data => data.name === (sucursal.month ? sucursal.month : months[month])).map ( data => data.y)[0]]
                
                ) );

                console.log(monthData)

                setOptions(o => ({
                    ...o,
                    title: {
                        text: `${sucursal.month ? sucursal.month : months[month]} - ${data[0].data[0].year}`
                    },
                    series: {
                        name:"Total",
                        data:  monthData,
                    }
                       

                    

                }))



            })

    }, [sucursal.month])






    return (
        <Pie options={options} />
    )
}

export default VentasSucursalesPorc