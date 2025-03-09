import spinner from "../public/spinner.svg";

interface Props {
  size?: string;
  marginRight?: string;
}
const SpinnerLoading = ({ size, marginRight }: Props) => {
  return (
    <div
      style={{
        width: size ?? "20px",
        marginRight: marginRight ?? "5px",
      }}
    >
      <img
        src={spinner}
        alt="spinner"
        className="h-full w-full object-contain"
      />
    </div>
  );
};

export default SpinnerLoading;
