interface Props {
  title: string;
  icon?: string;
  isSelected: boolean;
  onCLick: () => void;
}

function ChannelItem({ title, onCLick, isSelected, icon }: Props) {
  return (
    <div
      onClick={onCLick}
      className={`flex cursor-pointer items-center justify-start overflow-x-clip p-3  hover:bg-primary-900/10 
        ${isSelected == true ? "border-b border-primary-500 text-primary-500" : "border-b border-primary-600/10 text-white"}`}
    >
      {icon && <img src={icon} alt="icon" className="mr-2 h-7 w-7 rounded" />}
      <p className="max-w-64 whitespace-nowrap text-sm">{title}</p>
    </div>
  );
}

export default ChannelItem;
