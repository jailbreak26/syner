import ChannelTitle from "./ChannelTitle";
import ChannelItem from "./ChannelItem";
import LoadingLinear from "./LoadingLinear/LoadingLinear";

interface Props {
  title: string;
  selectedIndex?: number;
  list: PropsMap[];
  loading: boolean;
  error?: Error | undefined | null;
  isLive: boolean;
  onClick: (id: number) => void;
}
interface PropsMap {
  icon?: string;
  name: string;
}

const ListItems = ({
  title,
  isLive,
  selectedIndex,
  list,
  onClick,
  loading,
  error,
}: Props) => {
  return (
    <div
      className={`${isLive ? " lg:3/5 w-3/6" : "w-full"}  border-r border-primary-900`}
    >
      <ChannelTitle title={title} />

      {loading && <LoadingLinear />}
      {selectedIndex != null && error && <p>Error: {error.message}</p>}
      <div className="flex h-full  flex-col overflow-y-scroll md:h-screen">
        {list.map((item, index) => (
          <ChannelItem
            key={`${title} ${index}`}
            title={item.name}
            icon={item.icon}
            onCLick={() => onClick(index)}
            isSelected={selectedIndex === index}
          />
        ))}
      </div>
    </div>
  );
};

export default ListItems;
