import React, { Component } from "react";
import {Pie} from 'react-chartjs-2';




const PieChart =(props)=> {
  const state = {
      labels: ['Pending', 'Lead Converted'],
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: [
            '#191970',
            '#800080'
          
          ],
          // hoverBackgroundColor: [
          // '#9a55ff',1
          // '#fe7096'
          // ],
          data: [props.pending,props.leadConverted]
        }
      ]
    }
      return (
        <div>
          <Pie
            data={state}
            options={{
              title:{
                display:true,
                fontSize:20
              },
              legend:{
                display:true,
                position:'top'
              }
            }}
          />
          {/* <Pie
            data={state}
            options={{
              title:{
                display:true,
                fontSize:20
              },
              legend:{
                display:true,
                position:'top'
              }
            }}
          /> */}
          </div>
          );
        }
export default PieChart;