import { Link } from "react-router-dom";
import playIcon from "../public/play.svg";

interface Props {
  href: string;
  name: string;
  image?: string;
}

function MovieCard({ href, name, image }: Props) {
  return (
    <Link
      to={href}
      className="group relative flex h-40 cursor-pointer items-center justify-center rounded hover:shadow-md   hover:shadow-primary-900/30 md:h-48"
    >
      <img
        src={image}
        alt="Image Movie"
        className="absolute h-full w-full rounded"
      />
      <div className="absolute h-full w-full rounded bg-gradient-to-t from-black  opacity-0 group-hover:opacity-100">
        <p className="absolute bottom-0 w-full rounded-bl rounded-br  py-1 pl-1 text-sm  text-white">
          {name}
        </p>
      </div>

      <img
        src={playIcon}
        alt="play"
        className="absolute h-10 w-10 opacity-0 group-hover:opacity-100 group-hover:transition-all"
      />
    </Link>
  );
}

export default MovieCard;
