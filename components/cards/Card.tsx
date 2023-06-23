import StopIcon from "@/components/icons/StopIcon";
import { PlayIcon } from "@heroicons/react/24/outline";
import PauseIcon from "@/components/icons/PauseIcon";
import { use, useState } from "react";

type CardProps = {
  name: string;
  track_url: string;
  artists: {
    name: string;
    artist_url: string;
  }[];
  onClick: any;
};

const Card = ({ name, track_url, artists, onClick }: CardProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  return (
    <div className="flex border-2 rounded-md mx-8 p-2 sm:max-w-sm justify-between align-center">
      <div className="">
        <a href={track_url} className="text-sm">
          {name}
        </a>
        <div>
          {artists.map((artist) => (
            <a className="text-gray-500 text-xs" href={artist.artist_url}>
              {artist.name}{" "}
            </a>
          ))}
        </div>
      </div>

      <button className="border-2 rounded-full w-8 h-8" onClick={onClick}>
        <PlayIcon className="text-gray-600"></PlayIcon>
      </button>
    </div>
  );
};

export default Card;
