import { PlayIcon } from "@heroicons/react/24/outline";
import { PauseIcon } from "@heroicons/react/24/outline";

type CardProps = {
  id: number;
  name: string;
  track_url: string;
  preview_url: string;
  artists: {
    name: string;
    artist_url: string;
  }[];
  onClick: (id: string) => void;
  isPlaying?: boolean;
  found: boolean;
};

const Card = ({
  id,
  name,
  track_url,
  preview_url,
  artists,
  onClick,
  isPlaying = false,
  found,
}: CardProps) => {
  return (
    <div
      className={`flex rounded-2xl p-2 w-full justify-between ${
        found ? "bg-green-200" : "bg-red-200"
      } items-center`}
    >
      <div className="pl-2 whitespace-nowrap">
        <p className="w-[30ch] text-ellipsis overflow-hidden text-sm">
          <a href={track_url} target="_blank">
            {name}
          </a>
        </p>

        <p className="w-[30ch] text-ellipsis overflow-hidden">
          {artists.map((artist) => (
            <a
              className="text-gray-500 text-xs hover:underline"
              href={artist.artist_url}
              target="_blank"
            >
              {artist.name}{" "}
            </a>
          ))}
        </p>
      </div>

      <div
        className="flex hover:cursor-pointer"
        onClick={() => onClick(preview_url)}
      >
        {isPlaying ? (
          <PauseIcon className="text-gray-600 w-8 h-8"></PauseIcon>
        ) : (
          <PlayIcon className="text-gray-600 w-8 h-8"></PlayIcon>
        )}
      </div>
    </div>
  );
};

export default Card;
