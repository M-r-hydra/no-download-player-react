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
      setWh({
        h: window.innerHeight,
        w: window.innerWidth,
      });
    };
    window.addEventListener("change", oriantationChangehandler);

    return () => {
      window.removeEventListener("change", oriantationChangehandler);
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
          height: 200,
        }}
      />
    </div>
  );
};

export default App;
