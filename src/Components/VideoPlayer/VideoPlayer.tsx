// React
import React, { useEffect, useRef, useState } from "react";
// React
// CSS
import styles from "./VideoPlayer.module.css";
// CSS

type VideoPlayerProps = {
  videoSrc: string;
  container: {
    cssStyles?: React.CSSProperties;
    className?: string;
  };
  video: {
    cssStyles?: React.CSSProperties;
    className?: string;
  };
};

const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = ({
  videoSrc,
  container,
  video,
}) => {
  const [videoData, setVideoData] = useState<{
    videoMaxTime: string | number;
    currVideoTime: string | number;
    isMuted: boolean;
    currVolume: string | number;
    isPlaying: string | number;
  }>({
    videoMaxTime: "",
    currVideoTime: "",
    isMuted: false,
    currVolume: "",
    isPlaying: "",
  });
  /**               */
  /**               */
  /**               */
  /**               */
  // videoEl

  // videoEl
  // canvasEl
  const canvasEl = useRef<HTMLCanvasElement>(null);
  // canvasEl

  useEffect(() => {
    if (!canvasEl.current) {
      console.log(`canvasEl.current nooooo`);
      return;
    }
    const videoEl = document.createElement("video");
    videoEl.src = videoSrc;
    videoEl.className += video.className;
    setVideoData((prevState) => ({ ...prevState }));
    if (!videoEl) {
      console.log(`videoEl nooooo`);
      return;
    }
    const _video = videoEl;
    const canvas = canvasEl.current;
    canvas.onclick = () => {
      _video
        .play()
        .then(() => {
          console.log("video played");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // const div = divRef.current!;
    const ctx = canvas.getContext("2d")!;
    const drawFrame = () => {
      ctx.drawImage(_video, 0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      requestAnimationFrame(drawFrame);
    };
    _video.addEventListener("play", drawFrame);
    return () => {
      _video.removeEventListener("play", drawFrame);
    };
  }, [videoSrc, video.className]);

  return (
    <div
      className={`${styles.videoPlayerContainer}  ${container.className}`}
      style={{ ...container.cssStyles }}
    >
      <canvas ref={canvasEl} style={{ border: "1px solid magenta" }}>
        xxxx
      </canvas>
    </div>
  );
};

export default VideoPlayer;
