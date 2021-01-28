import React, { Component } from 'react'
import '../CanvasVideo/style.css'
import { TwoDimensionalVideo } from "../two-dimensional-video";

class CanvasVideo extends Component {
  static defaultProps = {
    width: 320,
    height: 200,
    strokeStyle: '#F00',
    lineWidth: 1,
    onSelected: () => { }
  };

  canvas = null;
  ctx = null;
  isDirty = false;
  isDrag = false;
  startX = -1;
  startY = -1;
  curX = -1;
  curY = -1;

  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      isPlaying: false,
      rectList: [],
      showCanvas: false
    }
  }

  handleSubmit = () => {
    const data = this.child.current.handleSubmit();
    return data;
  }

  addNewFrame = () => {
    this.setState({
      showCanvas: true
    })
  }

  render() {
    const { videoSectionWidth, videoUrlData } = this.props;
    const newStyle = {
      height: '500px'
    }

    const previewNoticeList = [
      'Cells\' body range.',
      'The time that cells <u>split</u>, <u>leave</u>, <u>obscured</u> and <u>show up</u> (if applicable).',
    ];
    const previewHeader = 'Please scan the video and observe the following to help you complete the task:';
    const emptyCheckSubmissionWarningText = 'Please annotate AND track one unmarked cell to complete this task.';
    const emptyCheckAnnotationItemWarningText = 'Step 2: Please track the cell bound by this box';
    const emptyAnnotationReminderText = 'Step 1: Click the button above to add a new box around a cell';
    //https://cildata.crbs.ucsd.edu/media/videos/15793/15793_web.mp4
    return (
      <div className='mb-3'>
        <TwoDimensionalVideo
          onSubmit={this.handleSubmit}
          // url='./assets/UploadedVideo/test-1_4.mp4'
          url={videoUrlData.video_url}
          videoWidth={videoSectionWidth}
          videoSectionWidth={videoSectionWidth}
          hasReview
          isEmptyCheckEnable
          isSplitEnable
          isShowHideEnable
          emptyCheckSubmissionWarningText={emptyCheckSubmissionWarningText}
          emptyCheckAnnotationItemWarningText={emptyCheckAnnotationItemWarningText}
          emptyAnnotationReminderText={emptyAnnotationReminderText}
          numAnnotationsToBeAdded={20}
          defaultAnnotations={[]}
          previewHeader={previewHeader}
          previewNoticeList={previewNoticeList}
          ref={this.child}
        />
      </div>
    );
  }
}


export default CanvasVideo


