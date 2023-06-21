import StopIcon from "@/components/icons/StopIcon";

type TileProps = {
  id: number;
  isPlaying?: boolean;
  isSelected?: boolean;
  showTile?: boolean;
  onClick: (id: number) => void;
};

const Tile = ({
  id,
  isPlaying = false,
  isSelected = false,
  showTile = true,
  onClick,
}: TileProps) => {
  return showTile ? (
    <div
      className={`flex items-center justify-center ${
        isSelected
          ? "bg-orange-300 hover:bg-orange-400"
          : "bg-slate-300 hover:bg-slate-400"
      } hover:cursor-pointer transition-colors duration-300 h-20 w-20`}
      onClick={() => onClick(id)}
    >
      {isPlaying && <StopIcon />}
    </div>
  ) : (
    <div className="h-20 w-20"></div>
  );
};

export default Tile;
