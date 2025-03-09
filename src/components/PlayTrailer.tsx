import { HiPlay } from "react-icons/hi";
import trailer from "../public/trailer.svg";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  isTrailer?: boolean;
  streamId: string | number | undefined;
}

const PlayTrailer = ({ title, isTrailer, streamId }: Props) => {
  function openTrailer(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    streamId: any,
  ) {
    e.preventDefault(); // Prevent the Link default behavior
    window.open(`https://www.youtube.com/watch?v=${streamId}`, "_blank"); // Replace `streamId` with the actual trailer URL
  }

  return (
    <Link
      to={isTrailer ? "#" : `/fullVideo/${streamId}`}
      onClick={(e) => {
        if (isTrailer) {
          openTrailer(e, streamId);
        }
      }}
      className={`flex items-center justify-center rounded
       ${isTrailer == true ? "bg-red-500" : "bg-primary-600"} h-9 min-w-40 text-center font-bold
     text-white ${isTrailer == true ? "hover:bg-red-600" : "hover:bg-primary-700"}`}
    >
      {isTrailer == true ? (
        <img
          src={trailer}
          alt="trailer"
          className="mr-2 h-6 w-6 text-gray-800 dark:text-white"
        />
      ) : (
        <HiPlay className="mr-2 h-6 w-6" />
      )}
      {title}
    </Link>
  );
};

export default PlayTrailer;
