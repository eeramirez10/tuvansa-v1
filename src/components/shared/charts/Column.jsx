import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Drilldown from 'highcharts/modules/drilldown';

Drilldown(Highcharts);

let initialOptions = {
    chart: {
        type: 'column'
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
                events: {
                    click: function () {
                        console.log(this)
                    }
                }
            }

        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y:,.0f}</b><br/>'
    },

    series: [
        {
            name: "Ventas",
            colorByPoint: true,
            data: [
                {
                    name: "Mexico",
                    y: 62.74,
                    drilldown: "Mexico"
                },
                {
                    name: "Firefox",
                    y: 10.57,
                    drilldown: "Firefox"
                },
                {
                    name: "Internet Explorer",
                    y: 7.23,
                    drilldown: "Internet Explorer"
                },
                {
                    name: "Safari",
                    y: 5.58,
                    drilldown: "Safari"
                },
                {
                    name: "Edge",
                    y: 4.02,
                    drilldown: "Edge"
                },
                {
                    name: "Opera",
                    y: 1.92,
                    drilldown: "Opera"
                },
                {
                    name: "Other",
                    y: 7.62,
                    drilldown: null
                }
            ]
        }
    ],
    drilldown: {
        breadcrumbs: {
            position: {
                align: 'right'
            }
        },
        series: [
            {
                name: "Mexico",
                id: "Mexico",
                data: [
                    {
                        "name": "ISABEL-M",
                        "y": 14098573
                    },
                    {
                        "name": "JC AGUIRRE",
                        "y": 3811599
                    },
                    {
                        "name": "ALICIA",
                        "y": 2350752
                    },
                    {
                        "name": "DANIEL",
                        "y": 2221454
                    },
                    {
                        "name": "D - J",
                        "y": 2150839
                    },
                    {
                        "name": "LUCIANA",
                        "y": 1882003
                    },
                    {
                        "name": "ARTURO NA",
                        "y": 1347930
                    },
                    {
                        "name": "PAOLA",
                        "y": 1299353
                    },
                    {
                        "name": "ISABEL",
                        "y": 825049
                    },
                    {
                        "name": "MARCELA - LORENA",
                        "y": 531737
                    },

                    {
                        "name": "VENTAS GENERALES",
                        "y": 328362
                    },
                    {
                        "name": "MINERIA",
                        "y": 271851
                    },
                    {
                        "name": "JOSEFINA",
                        "y": 218779
                    },
                    {
                        "name": "ALICIA",
                        "y": 213847
                    },
                    {
                        "name": "MARIO",
                        "y": 130668
                    },
                    {
                        "name": "LUIS ALFARO",
                        "y": 107032
                    },
                    {
                        "name": "BEATRIZ",
                        "y": 91818
                    },
                    {
                        "name": "JORGE",
                        "y": 65847
                    },
                    {
                        "name": "D - A",
                        "y": 44248
                    },
                    {
                        "name": "MARTHA",
                        "y": 32699
                    },
                    {
                        "name": "MIGUEL",
                        "y": 12526
                    }

                ]
            },
            {
                name: "Firefox",
                id: "Firefox",
                data: [
                    [
                        "v58.0",
                        1.02
                    ],
                    [
                        "v57.0",
                        7.36
                    ],
                    [
                        "v56.0",
                        0.35
                    ],
                    [
                        "v55.0",
                        0.11
                    ],
                    [
                        "v54.0",
                        0.1
                    ],
                    [
                        "v52.0",
                        0.95
                    ],
                    [
                        "v51.0",
                        0.15
                    ],
                    [
                        "v50.0",
                        0.1
                    ],
                    [
                        "v48.0",
                        0.31
                    ],
                    [
                        "v47.0",
                        0.12
                    ]
                ]
            },
            {
                name: "Internet Explorer",
                id: "Internet Explorer",
                data: [
                    [
                        "v11.0",
                        6.2
                    ],
                    [
                        "v10.0",
                        0.29
                    ],
                    [
                        "v9.0",
                        0.27
                    ],
                    [
                        "v8.0",
                        0.47
                    ]
                ]
            },
            {
                name: "Safari",
                id: "Safari",
                data: [
                    [
                        "v11.0",
                        3.39
                    ],
                    [
                        "v10.1",
                        0.96
                    ],
                    [
                        "v10.0",
                        0.36
                    ],
                    [
                        "v9.1",
                        0.54
                    ],
                    [
                        "v9.0",
                        0.13
                    ],
                    [
                        "v5.1",
                        0.2
                    ]
                ]
            },
            {
                name: "Edge",
                id: "Edge",
                data: [
                    [
                        "v16",
                        2.6
                    ],
                    [
                        "v15",
                        0.92
                    ],
                    [
                        "v14",
                        0.4
                    ],
                    [
                        "v13",
                        0.1
                    ]
                ]
            },
            {
                name: "Opera",
                id: "Opera",
                data: [
                    [
                        "v50.0",
                        0.96
                    ],
                    [
                        "v49.0",
                        0.82
                    ],
                    [
                        "v12.1",
                        0.14
                    ]
                ]
            }
        ]
    }
}

const Column = ({ data }) => {

    const [options, setOptions] = useState(initialOptions);


    const updateSeries = () => {
        setOptions({
            ...options,
            series: [
                {
                    name: "Ventas",
                    colorByPoint: true,
                    data: data.series
                }
            ],
            drilldown: {
                series: data.seriesDrillDown
            }
        })
    }


    useEffect(()=>{

        if(data){

            setOptions({
                ...options,
                series:[
                    {
                        name: "Ventas",
                        colorByPoint: true,
                        data: data?.series
                    }
                ],
                drilldown:{
                    breadcrumbs: {
                        position: {
                            align: 'right'
                        }
                    },
                    series: data?.seriesDrillDown
                }
            })

        }


    }, [data])


    



    return (

        <>


            {
                data &&

                <HighchartsReact highcharts={Highcharts} options={options} />



            }









        </>





    )
}

export default Column