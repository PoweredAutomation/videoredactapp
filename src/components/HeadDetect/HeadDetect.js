import React, { useState, useEffect, Component } from 'react'
import MaterialTable from 'material-table'



class HeadDetect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      FaceDataList: []
    }
  }

  FaceDataListNew = []

  componentDidMount(){
    for(let i = 0; i < this.props.faceData.faces.length; i++){

      const item = this.props.faceData.faces[i];
  
      let FaceData = {}
  
      FaceData['object'] = <img src={item.object} alt='img' />
      FaceData['time'] = item.starttime
      FaceData['auto'] = item.auto ? 'Yes' : 'No'
      FaceData['Manual'] = item.Manual ? 'Yes' : 'No'
  
      this.FaceDataListNew.push(FaceData)
    }
    // debugger;
    console.log(this.FaceDataListNew)

    this.setState(
      {
        FaceDataList: this.FaceDataListNew
      }
    )
  }

  BlurData = []

  getRowData = (data) =>{
    // debugger;
    // let data1 = {
    //   abc: "abc"
    // }

    for(let i=0; i < data.length; i++ ){
      // debugger;
      // console.log(data[0].object)
      const item = data[i];
      this.BlurData.push(
        {
          "url": item.object.props.src
        }
      )

    }

    let BlurAllData = {
      "user_id": this.props.UserID,
      "video_id": this.props.faceData.video_id,
      "video_name": this.props.faceData.video_name,
      "video_url": this.props.faceData.video_url,
      "image_url": this.BlurData
    }
    
    this.props.getSelectedRows(BlurAllData)
  }

  
   columns = [
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

  // handleSubmit = (data) => {
  //   // const data = current.handleSubmit();
  //   return data;
  // }
  
  render(){
    const {FaceDataList} = this.state
    return (
      <div>
        <MaterialTable 
        // title='Detected Faces'
        data={FaceDataList}
        columns={this.columns}
        options={{
          selection: true,
          search: false,
          paging: false,
          showTextRowsSelected: true,
          toolbar: false
        }}
        
        onSelectionChange={(rowData) => this.getRowData(rowData)}
        />
      </div>
    )
  }

  
}



export default HeadDetect
