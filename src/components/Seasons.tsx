import { Dropdown } from "flowbite-react";

interface Props {
  title: string;
  listItems: string[];
  onSelect: (index: string) => void;
}

const SeasonsButton = ({ title, onSelect, listItems }: Props) => {
  return (
    <div className="h-9 rounded bg-primary-500 md:w-40">
      <Dropdown
        className="flex justify-center bg-primary-500 text-center"
        label={title}
        dismissOnClick={true}
        style={{
          width: "100%",
          padding: "0",
          margin: "0",
        }}
      >
        {listItems.map((season, index) => (
          <Dropdown.Item onClick={() => onSelect(season)} key={index}>
            Season {season}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export default SeasonsButton;
