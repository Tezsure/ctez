import React from "react";
import { Line } from "react-chartjs-2";

const GraphOneLine : React.FC<{labelArr:number[],data1:number[]}> =(props)=>{
    const data = {
        labels: props.labelArr,
        datasets: [
          {
            label: 'false',
            data: props.data1,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
        ]
      };
      const options = {
        legend: {
          display: false,
        },
        tooltips: {
         enabled: false
        },
        elements: {
            point:{
                radius: 0
            }
        }
      };
  return (<Line data={data} options={options} />);

}
export default GraphOneLine;