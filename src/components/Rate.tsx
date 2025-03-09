import { Rating } from "flowbite-react";

interface Props {
  rate: number | string;
}

function Rate({ rate }: Props) {
  return (
    <div className="flex items-center justify-center rounded-3xl bg-primary-500 px-1.5 py-1">
      <Rating className="w-5 text-orange-400">
        <Rating.Star filled={true} />
      </Rating>
      <p className="font-bold text-white">{rate}</p>{" "}
    </div>
  );
}

export default Rate;
