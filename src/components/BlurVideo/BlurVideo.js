import React, { Component } from 'react'
import { Player, BigPlayButton, LoadingSpinner, ControlBar, ReplayControl, ForwardControl, PlaybackRateMenuButton } from 'video-react';
// import '../CanvasVideo/style.css'

class BlurVideo extends Component {
    componentDidMount() {
        this.player.playbackRate = 1;
        this.forceUpdate();
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
                        src="https://original-video.s3.amazonaws.com/index.mp4?AWSAccessKeyId=AKIAIFWF3UATSC6JEWBA&Signature=WZ7CZLh77lEXM3wkF%2FCqFyaJT14%3D&Expires=1611484103"
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
                        <p className="mb-0">Motivation Video.mp4</p>
                        <p>Wed Jun 03, 2021 09:30 AM</p>
                        <button type="button" className="btn btn-outline-secondary mr-3 rounded-0">DELETE</button>
                        <button className="btn btn-primary rounded-0" type="submit">DOWNLOAD</button>
                </div>
                
                
                

                {/* <iframe class="w-100" height="450" src="https://www.youtube.com/embed/0PiT6YKOaqU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            </div>
        )
    }
}


export default BlurVideo


