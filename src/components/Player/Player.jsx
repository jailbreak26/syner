import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css"; //requred for player css
import Hls from "hls.js";
import "./Player.css";

const PlayerVideo = ({ videoUrl, isSelected }) => {
  //
  const videoRef = useRef(null);

  const getVideoUrlFormat = (url) => {
    // Add timestamp to prevent caching
    const timestamp = Date.now();
    url = url.includes("?") ? `${url}&t=${timestamp}` : `${url}?t=${timestamp}`;

    return url;
  };

  useEffect(() => {
    const video = videoRef.current;

    const videoStream = videoUrl == null ? "" : getVideoUrlFormat(videoUrl); // `${videoUrl}`;

    // console.log("VIDEO:", videoStream);

    if (video) {
      const player = new Plyr(video);

      if (Hls.isSupported()) {
        //&& videoStream.endsWith(".m3u8")
        const hls = new Hls({
          debug: false,
          enableWorker: false,
        });

        hls.log = false;
        hls.loadSource(videoStream);
        hls.attachMedia(video);

        // Error handling for Hls.js
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.fatal) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error(
                  "A network error occurred while fetching the video.",
                );
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error(
                  "A media error occurred while playing the video.",
                );
                break;
              case Hls.ErrorTypes.OTHER_ERROR:
                console.error("An unknown error occurred.");
                break;
            }
          }
        });
      } else {
        console.error("Browser No support HLS");
        video.src = videoStream; // For browsers that natively support HLS or other formats
      }
    }
  }, [videoUrl]);

  return (
    <div
      className={`order-1 ${isSelected ? "h-96" : "h-64"} w-full bg-black text-white`}
    >
      {isSelected ? (
        <video
          ref={videoRef}
          className="plyr bg-black"
          controls
          autoPlay={true}
          muted
          width={"100%"}
          height={"100%"}
          type="application/x-mpegURL"
        />
      ) : null}
    </div>
  );
};

export default PlayerVideo;
