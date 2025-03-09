//import bars_icon from "../public/bars-icon.svg";

interface PropsTile {
  title: string;
}
function ChannelTitle({ title }: PropsTile) {
  return (
    <div className="flex justify-center border-b border-primary-900 py-3 text-center">
      <h3 className="  text-white ">{title}</h3>
    </div>
  );

  /*
   <button className="block justify-center rounded bg-primary-500 p-1 md:hidden">
        <img src={bars_icon} alt="" className=" h-6 w-6 text-white " />
      </button>
  */
}

export default ChannelTitle;
