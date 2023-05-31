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
  }>();
  /**               */
  /**               */
  /**               */
  /**               */
  // videoEl
  const videoEl = useRef<HTMLVideoElement>(null);
  // videoEl
  // canvasEl
  const canvasEl = useRef<HTMLCanvasElement>(null);
  // canvasEl
  const x = React.createElement(
    "video",
    {
      src: videoSrc,
      className: video.className,
      style: video.cssStyles,
      ref: videoEl,
    },
    null
  );

  useEffect(() => {
    if (!canvasEl.current) return;
    if (!videoEl.current) return;
    const _video = videoEl.current;

    const canvas = canvasEl.current;
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
  }, []);

  return (
    <div
      className={`${styles.videoPlayerContainer}  ${container.className}`}
      style={{ ...container.cssStyles }}
    >
      <canvas ref={canvasEl}></canvas>
    </div>
  );
};

export default VideoPlayer;
