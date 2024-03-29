import StopIcon from "@/components/icons/StopIcon";
import { motion } from "framer-motion";

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
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <div
        className={`flex items-center justify-center rounded-lg transition ${
          isSelected
            ? "bg-green-300 hover:bg-green-400"
            : "bg-slate-300 hover:bg-slate-400"
        } hover:cursor-pointer transition-colors duration-300 h-16 w-16 lg:h-20 lg:w-20`}
        onClick={() => onClick(id)}
      >
        {isPlaying && <StopIcon />}
      </div>
    </motion.div>
  ) : (
    <div className="h-16 w-16 lg:h-20 lg:w-20"></div>
  );
};

export default Tile;
