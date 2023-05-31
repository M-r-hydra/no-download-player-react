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
  canvas: {
    width: number;
    height: number;
  };
};

const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = ({
  videoSrc,
  container,
  video,
  canvas,
}) => {
  const [videoData, setVideoData] = useState<{
    videoMaxTime: string | number;
    currVideoTime: string | number;
    isMuted: boolean;
    currVolume: string | number;
    isPlaying: boolean;
  }>({
    videoMaxTime: "",
    currVideoTime: "",
    isMuted: false,
    currVolume: "",
    isPlaying: false,
  });
  //
  const [oriantaitinAngle, setoriantaitinAngle] = useState<number>(0);
  /**               */
  /**               */
  /**               */
  /**               */
  // videoEl
  const _vid = useRef<any>();
  // videoEl
  // canvasEl
  const canvasEl = useRef<HTMLCanvasElement>(null);
  // canvasEl
  useEffect(() => {
    console.log(oriantaitinAngle);
    const videoEl = document.createElement("video");
    _vid.current = videoEl;
    if (!canvasEl.current) {
      console.log(`canvasEl.current nooooo`);
      return;
    }
    videoEl.src = videoSrc;
    videoEl.className += video.className;

    setVideoData((prevState) => ({ ...prevState }));
    if (!videoEl) {
      console.log(`videoEl nooooo`);
      return;
    }
    const _video = videoEl;
    _video.controls = false;
    const canvas = canvasEl.current;
    canvas.onclick = () => {
      _video
        .play()
        .then(() => {
          console.log("video played");
          setVideoData((prevState) => ({ ...prevState, isPlaying: true }));
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
  }, [videoSrc, video.className, oriantaitinAngle]);

  useEffect(() => {
    console.log(oriantaitinAngle);
    if (!_vid.current) {
      console.log("noVid !");
      return;
    }
    if (videoData.isPlaying === false) return;
    const timeOut = setTimeout(() => {
      setVideoData((prevState) => ({
        ...prevState,
        currVideoTime: Number(prevState.currVideoTime) + 1,
      }));
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [videoData, oriantaitinAngle]);

  useEffect(() => {
    const oriantationChangehandler = (e: any) => {
      setoriantaitinAngle(e.target.screen.orientation.angle);
    };
    window.addEventListener("orientationchange", oriantationChangehandler);

    return () => {
      window.removeEventListener("orientationchange", oriantationChangehandler);
    };
  }, []);

  return (
    <div
      className={`${styles.videoPlayerContainer}  ${container.className}`}
      style={{ ...container.cssStyles }}
    >
      <canvas
        className={`${styles.canvasItem}`}
        ref={canvasEl}
        style={{ border: "1px solid magenta" }}
        width={canvas.width}
        height={canvas.height}
      ></canvas>
      <div className={`${styles.controlCenter}`}>
        {videoData.isPlaying ? <></> : <></>}
      </div>
    </div>
  );
};

export default VideoPlayer;
