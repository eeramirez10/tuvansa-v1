import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const BasicLine = ({
    options
}) => {
  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default BasicLine