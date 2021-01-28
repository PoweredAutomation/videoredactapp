import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'



function HeadDetect(props) {

  let FaceDataList = []

  for(let i = 0; i < props.faceData.faces.length; i++){

    const item = props.faceData.faces[i];

    let FaceData = {}

    FaceData['object'] = <img src={item.object} alt='img' />
    FaceData['time'] = item.starttime
    FaceData['auto'] = item.auto ? 'Yes' : 'No'
    FaceData['Manual'] = item.Manual ? 'Yes' : 'No'

    FaceDataList.push(FaceData)
  }

  
  const columns = [
    {
      title: 'Object', field: 'object'
    },
    {
      title: '# Time', field: 'time'
    },
    {
      title: 'Auto', field: 'auto'
    },
    {
      title: 'Manual', field: 'Manual'
    }
  ]

  return (
    <div>
      <MaterialTable 
      // title='Detected Faces'
      data={FaceDataList}
      columns={columns}
      options={{
        selection: true,
        search: false,
        paging: false,
        showTextRowsSelected: false,
        toolbar: false
      }}
      />
    </div>
  )
}

export default HeadDetect