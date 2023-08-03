import PlayIcon from "../icons/PlayIcon";
import StopIcon from "../icons/StopIcon";

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
  playable?: boolean;
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
  playable = true,
}: CardProps) => {
  return (
    <div
      className={`flex rounded-2xl p-2 w-full justify-between ${
        found ? "bg-green-200" : "bg-red-200"
      } items-center`}
    >
      <div className="pl-2 whitespace-nowrap">
        <p className="w-[30ch] text-ellipsis overflow-hidden">
          <a
            href={track_url}
            target="_blank"
            className="text-gray-800 text-sm hover:underline"
          >
            {name}
          </a>
        </p>

        <p className="w-[30ch] text-ellipsis overflow-hidden">
          {artists.map((artist) => {
            if (artists.indexOf(artist) == artists.length - 1) {
              return (
                <span key={artist.artist_url}>
                  <a
                    className="text-gray-500 text-xs hover:underline"
                    href={artist.artist_url}
                    target="_blank"
                  >
                    {artist.name}
                  </a>
                </span>
              );
            } else {
              return (
                <span key={artist.artist_url}>
                  <a
                    className="text-gray-500 text-xs hover:underline"
                    href={artist.artist_url}
                    target="_blank"
                  >
                    {artist.name}
                  </a>
                  <span className="text-gray-500 text-xs">{", "}</span>
                </span>
              );
            }
          })}
        </p>
      </div>
      {playable ? (
        <div
          className="flex hover:cursor-pointer p-2 bg-white rounded-full hover:scale-105 hover:bg-neutral-100"
          onClick={() => onClick(preview_url)}
        >
          {isPlaying ? <StopIcon /> : <PlayIcon />}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Card;
