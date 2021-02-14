import React, { Component } from 'react'
import AudioTranscript from '../AudioTranscript/AudioTranscript'
import CanvasVideoPlayer from '../CanvasVideo/CanvasVideo'
import HeadDetect from '../HeadDetect/HeadDetect'
import Timeline from '../Timeline/Timeline'
import '../VideoPage/style.css'
import BlurVideo from '../BlurVideo/BlurVideo'
import axios from 'axios'
import { WaveLoading } from "styled-spinkit";


class VideoPage extends Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            videoAnnotationData: {},
            videoHeadandAudioData: {},
            videoSectionWidth: 0,
            videoData: [],
            videoBlurData: {},
            loading: true,
            redactionType: "",
            redactionLevel: "",
            muteType: "",
            activeTab: "",
            redactedVideo: "",
            redactedVideoData: {}
            
        }
    }


    async componentDidMount() {
        this.state.loading = true;

        let userid = this.props.match.params.user_id
        let videoid = this.props.match.params.video_id

        console.log(`https://videoredactapi.herokuapp.com/getVideoData/${userid}?video_id=${videoid}`)

        const response = await axios.get(`https://videoredactapi.herokuapp.com/getVideoData/${userid}?video_id=${videoid}`);

        console.log(response.status);
        // debugger;

        if(response.status !== 200){
            // debugger;
            window.location.reload()
        }
//         else if(response.data['response'][0]['message'] === "Video uploading"){
//             window.location.reload()
//         }

        this.setState({ videoData: response.data }, () => {
            this.setState({loading: false})
            //console.log(this.state.videoData)
        });

        if(document.getElementById('videoSection')){
            const videoSectionWidth = document.getElementById('videoSection').clientWidth;
            this.setState({
                videoSectionWidth
            })
        }
        
        
    }

    getSelectedRows =(data) => {
        this.setState({
            videoBlurData: data
        });
    }



    handleSaveAndClose = async () => {
        // const data = this.child.current.handleSubmit();
        const { videoBlurData, redactionType, redactionLevel} = this.state;
        
        videoBlurData['readctiontype'] = redactionType
        videoBlurData['level_simple'] = "2"
        videoBlurData['level_pixelate'] = "2"
        console.log(videoBlurData)
        this.setState({loading: true})
        
        try {
            const response = await axios.post('https://videoredactapi.herokuapp.com/getEditedVideo', videoBlurData);
            this.setState({
                redactedVideo: "video_redcated_url"
            });
    
            this.getRedactedVideo()
        } catch (error) {
            console.log(error)
            this.setState({
                redactedVideo: "video_redcated_url"
            });
    
            this.getRedactedVideo()
        }
    }


    async getRedactedVideo(){
        const response = await axios.get(`https://videoredactapi.herokuapp.com/getRedactedVideoData/${this.props.match.params.user_id}?video_id=${this.props.match.params.video_id}`);
        if(response.status === 200){
            console.log(`Get Redaction URL id - ${response.data.redacted_url}`)
            if(response.data.redacted_url === "video_redcated_url"){
                this.getRedactedVideo()
            }
            else{
                console.log(response.data)
                this.setState({
                    loading: false, 
                    redactedVideo: response.data.redacted_url,
                    redactedVideoData: response.data
                })
            }
        }
        else{
            this.getRedactedVideo()
        }
    }



    

    handleSave = () => {
        const data = this.child.current.handleSubmit();
        this.setState({
            videoAnnotationData: data
        }, () => {
            const { videoAnnotationData } = this.state;
            // console.log(videoAnnotationData)
        });
    }

    handleRangeOption = (e) => {
        console.log(e.target.value);
        this.setState({
            redactionLevel: e.target.value
        })
    }

    handleMuteOption = (e) => {
        console.log(e.target.value);
        this.setState({
            muteType: e.target.value
        })
    }

    handleBulrOption = (e) => {
        console.log(e.target.value);
        this.setState({
            redactionType: e.target.value
        })
    }


    // annotations[0].incidents[0].time

    render() {
        // const [MyData] = useState(null);
        const { videoSectionWidth, videoData, loading, videoAnnotationData, redactedVideoData, redactedVideo } = this.state;
        console.log(`All Done data - ${redactedVideoData}`)
        
        
        return (
            loading ? 
            <WaveLoading size={80} /> :
            <div>
                <ul class="nav nav-tabs align-items-center" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="result-tab" data-toggle="tab" href="#result" role="tab" aria-controls="result" aria-selected="true">EDIT VIDEO</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="files-tab" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="false">FINAL VIDEO</a>
                    </li>
                    <div className="ml-auto">
                        <button onClick={this.handleSave} class="btn btn-sm btn-success mr-3 ">
                            SAVE
                        </button>
                            {/* <button onClick={this.handleSaveAndClose} class="btn btn-sm btn-info mr-3" data-toggle="modal" data-target="#exampleModal"> */}
                            <button  class="btn btn-sm btn-info mr-3" data-toggle="modal" data-target="#exampleModal">
                            SAVE & CLOSE
                        </button>
                    </div>
                </ul>
                <div class="container-fluid">
                    <div class="tab-content mt-3" id="myTabContent">
                        <div class="tab-pane fade show active" id="result" role="tabpanel" aria-labelledby="result-tab">
                            <div class="row">
                                <div class="col-md-7" id="videoSection">
                                    <CanvasVideoPlayer ref={this.child} onSubmit={this.handleSubmit} videoSectionWidth={videoSectionWidth} videoUrlData = {videoData} />
                                    <div class="row no-gutters">
                                        <Timeline udrData = {videoAnnotationData} audioData = {videoData}/>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item w-50 text-center" role="presentation">
                                            <a class="nav-link active" id="video-tab" data-toggle="tab" href="#video" role="tab" aria-controls="video" aria-selected="true">Video</a>
                                        </li>
                                        <li class="nav-item w-50 text-center" role="presentation">
                                            <a class="nav-link" id="audio-tab" data-toggle="tab" href="#audio" role="tab" aria-controls="audio" aria-selected="false">Audio</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="video" role="tabpanel" aria-labelledby="video-tab">
                                            <div class="card va-card">
                                                <div class="card-body card-scroll">
                                                    <HeadDetect  faceData = {videoData} getSelectedRows={this.getSelectedRows} UserID = {this.props.match.params.user_id}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="audio" role="tabpanel" aria-labelledby="audio-tab">
                                            <div class="card va-card">
                                                <div class="card-body">
                                                    <AudioTranscript transcriptData = {videoData}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">

                            </div>
                        </div>
                        <div class="tab-pane fade" id="files" role="tabpanel" aria-labelledby="files-tab">
                            <BlurVideo blurVideoData = {videoData} redactedVideoData = {redactedVideoData} redactedVideoURL={redactedVideo} />
                        </div>
                    </div>
                </div>
                
                <div class="modal fade" id="exampleModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered modal-md">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Settings</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div className="row">
                            <div className="col  text-left">
                                <h3>Video</h3>
                            </div>
                        </div>
                        <div className="row" style={{marginBottom: "20px"}}>
                            <div className="col-md-6 text-left">
                                Redaction Type
                            </div>
                            <div className="col-md-6 text-left">
                                <select onChange={this.handleBulrOption} class="form-select" aria-label="Default select example">
                                    <option value="0"></option>
                                    <option value="Blur">Blur</option>
                                    <option value="Pixelate">Pixelate</option>
                                </select>
                            </div>
                        </div>
                        <div className="row"  style={{marginBottom: "20px"}}>
                            <div className="col-md-6 text-left">
                                Redaction Level
                            </div>
                            <div className="col-md-6 text-left">
                                <select onChange={this.handleRangeOption} class="form-select" aria-label="Default select example">
                                    <option value="0"></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        </div>
                        <div className="row"  style={{marginBottom: "20px"}}>
                            <div className="col  text-left">
                                <h3>Audio</h3>
                            </div>
                          </div>
                        <div className="row"  style={{marginBottom: "20px"}}>
                            <div className="col-md-6 text-left">
                                Redaction Type
                            </div>
                            <div className="col-md-6 text-left">
                                <select onChange={this.handleMuteOption} class="form-select" aria-label="Default select example">
                                    <option value="0"></option>
                                    <option value="Mute">Mute</option>
                                    <option value="Tone">Tone</option>
                                </select>
                            </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" onClick={this.handleSaveAndClose}  data-dismiss="modal" class="btn btn-primary">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div >
        )
    }
}


export default VideoPage
