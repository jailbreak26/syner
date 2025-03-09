import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  icon: string;
  href: string;
}

function CardHomeItem({ title, icon, href }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(href);
      }}
      className="shadow-cyan-500/50 flex h-2/3 w-full cursor-pointer flex-col
        items-center justify-center gap-3 rounded bg-cardBg shadow-md  transition-colors hover:bg-primary-700"
    >
      <img src={icon} alt="Icon Card" className="h-20 w-20 text-white" />
      <h3 className="text-2xl text-white">{title}</h3>
    </div>
  );
}

export default CardHomeItem;
