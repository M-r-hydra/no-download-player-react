// React
import React from "react";
// React
// CSS
import "./index.css";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import { videoItem } from "./Videos";
// CSS
const App = () => {
  return (
    <div className="appContainer">
      <p>videoPlayer</p>
      <button
        onClick={() => {
          console.clear();
          window.location.reload();
        }}
        style={{
          padding: "1rem",
          margin: "1rem",
        }}
      >
        refresh Me
      </button>
      <VideoPlayer container={{}} video={{}} videoSrc={videoItem} />
    </div>
  );
};

export default App;
