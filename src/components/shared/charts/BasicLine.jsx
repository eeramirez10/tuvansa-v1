import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const lineOptions = {
  title: {
      text: 'Ventas Sucursales - 2022'
  },

  subtitle: {
      text: ''
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

  plotOptions: {
      line: {
          dataLabels: {
              enabled: false
          },
          enableMouseTracking: true
      }
  },



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


const BasicLine = ({data}) => {

  const [ options , setOptions] = useState(lineOptions)

  const chartComponent = useRef(null);

  useEffect(() =>{

    setOptions({
      ...options,
       series: data
    })

    const chart = chartComponent.current

    console.log(chart)

  },[data])



  

  return (
    <HighchartsReact ref={chartComponent} highcharts={Highcharts} options={options} />
  )
}

export default BasicLine