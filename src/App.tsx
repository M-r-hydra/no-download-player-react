// React
import React, { useEffect, useState } from "react";
// React
// CSS
import "./index.css";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import { videoItem } from "./Videos";
// CSS
const App = () => {
  const [wh, setWh] = useState<{ w: number; h: number }>({
    h: window.innerHeight,
    w: window.innerWidth,
  });

  useEffect(() => {
    const oriantationChangehandler = (e: any) => {
      console.log(e.target.screen.orientation.angle);

      setWh({
        h:
          e.target.screen.orientation.angle === 0
            ? window.innerHeight
            : window.innerWidth,
        w:
          e.target.screen.orientation.angle === 0
            ? window.innerWidth
            : window.innerHeight,
      });
    };
    window.addEventListener("orientationchange", oriantationChangehandler);

    return () => {
      window.removeEventListener("orientationchange", oriantationChangehandler);
    };
  }, []);

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
      <VideoPlayer
        container={{}}
        video={{}}
        videoSrc={videoItem}
        canvas={{
          width: wh.w * 0.98,
          height: 400,
        }}
      />
    </div>
  );
};

export default App;
