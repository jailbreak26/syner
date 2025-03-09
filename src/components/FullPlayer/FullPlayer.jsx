import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css"; //requred for player css
import Hls from "hls.js";
import "./Player.css";
import { useParams } from "react-router-dom";
import { getUserData } from "../../api/userDataService";
import { NavBar } from "../NavBar";

const FullPlayerVideo = (props) => {
  //
  const videoRef = useRef(null);

  const { videoId, typePlayer } = useParams();

  useEffect(() => {
    const userData = getUserData();
    const videoUrl = `${userData.url}/${typePlayer}/${userData.username}/${userData.password}/${videoId}`;
    const video = videoRef.current;
    const videoStream = `${videoUrl}`;

    console.log("VIDEO:", videoStream);

    if (video) {
      const player = new Plyr(video);

      if (Hls.isSupported() && videoStream.endsWith(".m3u8")) {
        const hls = new Hls();

        hls.loadSource(videoStream);
        hls.attachMedia(video);
      } else {
        video.src = videoStream; // For browsers that natively support HLS or other formats
      }

      //Full Screen By Default
      player.fullscreen.enter();
    }
  }, [videoId]);

  return (
    <div className="h-full bg-background  md:h-screen">
      <NavBar />
      <div className="flex h-full w-full items-center justify-center bg-black">
        <video
          ref={videoRef}
          className="plyr"
          controls
          autoPlay
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
};

export default FullPlayerVideo;
