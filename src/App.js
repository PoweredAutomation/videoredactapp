import './App.css';
import VideoPage from './components/VideoPage/VideoPage';
import 'video-react/dist/video-react.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/:user_id/:video_id" exact component={VideoPage} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
