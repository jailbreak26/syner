import { Link } from "react-router-dom";

interface Props {
  name: string;
  duration: string;
  image?: string;
  href: string;
}
const EpisodeItem = (props: Props) => {
  return (
    <Link to={props.href} className="group flex cursor-pointer">
      <img
        src={props.image}
        alt="epidos img"
        className="flex h-1/2 max-h-28 w-1/4  rounded"
      />

      <div className="ml-2 text-white group-hover:text-primary-500">
        <h2 className="font-bold md:text-lg">{props.name}</h2>
        <p className="text-xs font-light md:text-sm">{props.duration}</p>
      </div>
    </Link>
  );
};

export default EpisodeItem;
