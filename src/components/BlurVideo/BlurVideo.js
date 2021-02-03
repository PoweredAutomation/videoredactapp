import React, { Component } from 'react'
import { Player, BigPlayButton, LoadingSpinner, ControlBar, ReplayControl, ForwardControl, PlaybackRateMenuButton } from 'video-react';
// import '../CanvasVideo/style.css'
import axios from 'axios'

class BlurVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          // FaceDataList: []
        }
      }

    componentDidMount() {
        this.player.playbackRate = 1;
        this.forceUpdate();
      }

    
    downloadVideo() {

        
        try {
            window.location.href = this.props.redactedVideoData.redacted_url
        } catch (error) {
            console.log(error)
        }
        // const response = await axios.post('https://videoredactapi.herokuapp.com/downloadRedactedVideo', {
        //     "user_id": "165",
        //     "video_id": "103",
        //     "video_name": "test-1_2.mp4"
        //   });
        // console.log(response.data.video_url)
        // const url = window.URL.createObjectURL(response.data.video_url)
        // window.location.href = {this.props.redactedVideoData.redacted_url}
        // const link = document.createElement('a')
        // link.href = link
        // link.setAttribute('download', 'myVideo.mp4')
        // document.body.appendChild(link)
        // link.click()
        // this.setState(console.log(response.data), () => {
        //     this.setState({loading: false})
        //     //console.log(this.state.videoData)
        // });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8">
                    <Player 
                        ref={c => {
                            this.player = c;
                        }}
                        poster=""
                        src={this.props.redactedVideoData.redacted_url}
                        class="Custom-Player-Height"
                    >
                        <LoadingSpinner />
                        <BigPlayButton position="center" />
                        <ControlBar autoHide={false}>
                            <ReplayControl seconds={10} order={2.1} />
                            <ForwardControl seconds={10} order={2.2} />
                            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
                        </ControlBar>
                    </Player>
                </div>
                <div className="col-md-4 text-left">
                    <h5>Latest Redacted File</h5>
                    <p className="mb-0">{this.props.redactedVideoData.video_name}</p>
                    <p>{this.props.redactedVideoData.video_upload_dt}</p>
                    <button type="button" className="btn btn-outline-secondary mr-3 rounded-0">DELETE</button>
                    <button onClick={this.downloadVideo} className="btn btn-primary rounded-0" type="submit">DOWNLOAD</button>
                </div>
            </div>
        )
    }
}


export default BlurVideo


