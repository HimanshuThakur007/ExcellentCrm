import React from "react";
import {HorizontalBar} from 'react-chartjs-2';


const state = {
    labels: [2000, 2010, 2011,2015, 2020],
    datasets: [
      {
        backgroundColor: [
          '#808000',
          '#FFA500',
          '#045F5F',
          '#387C44',
          '#41A317'
        ],
        borderWidth: 2,
        label : 'sree',
        data: [2478, 5267, 734, 784, 433]
      }
    ]
  }

const HorizontalBarChart =()=> {
      return (
        <div>
           <HorizontalBar
              data={state}          
              options={{
                legend:{
                  display:false,
                }
              }}
            />
          </div>
          );
        }
export default HorizontalBarChart;          