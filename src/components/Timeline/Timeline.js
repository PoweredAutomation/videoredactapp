import React, { Component } from 'react'
import '../Timeline/style.css'
import Chart from 'react-google-charts'


function Timeline(props) {

    const options = {
        'overflow': 'hidden'
    };

    

    console.log(props.udrData);

    let TimeLineData = [
      [
        { type: 'string', id: 'Position' },
        { type: 'string', id: 'Name' },
        { type: 'number', id: 'Start' },
        { type: 'number', id: 'End' },
      ]
    ]

    // debugger;
    if(Object.keys(props.udrData).length !== 0 && props.udrData.constructor === Object){
      // debugger;
      if(props.udrData.annotations.length !== 0){
        for(let i = 0; i < props.udrData.annotations[0].incidents.length; i++){

          const item = props.udrData.annotations[0].incidents[i]
      
          TimeLineData.push([
            "UDR",
            "",
            item.time*1000000,
            item.time*1000000
          ])
        }
      }
      else{
        TimeLineData.push([
          "UDR",
          "",
          0,
          0
        ])
      }
    }
    else{
      TimeLineData.push([
        "UDR",
        "",
        0,
        0
      ])
    }

    if(props.audioData.faces.length !== 0){
      for(let i = 0; i < props.audioData.faces.length; i++){

        const item = props.audioData.faces[i]
    
        TimeLineData.push([
          "HEAD",
          "",
          item.starttime,
          item.endtime
        ])
      }
    }
    else{
      TimeLineData.push([
        "HEAD",
        "",
        0,
        0
      ])
    }

    if(props.audioData.faces.length !== 0){
      for(let i = 0; i < props.audioData.faces.length; i++){

        const item = props.audioData.faces[i]
    
        TimeLineData.push([
          "TRANSCRIPTION",
          "",
          item.starttime,
          item.endtime
        ])
      }
    }
    else{
      TimeLineData.push([
        "TRANSCRIPTION",
        "",
        0,
        0
      ])
    }

    

    

    return (
        <div class="col-md-12">
            <div class="card time-line-card">
                <div class="card-body">
                    <Chart 
                        width={'100%'}
                        height={'180px'}
                        chartType="Timeline"
                        loader={<div>Loading Timeline</div>}
                        style={options}
                        data={TimeLineData}
                        rootProps={{ 'data-testid': '2' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Timeline
