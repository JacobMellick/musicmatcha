import { useEffect, useState } from "react";

import type { Track } from "@/types/proj01";
import { usePlayer } from "@/context/PlayerContext";

import { NUM_MOVES } from "@/lib/constants";
import Card from "@/components/cards/Card";

type GameOverProps = {
  tracks: Track[];
  solved: Track[];
  moves: number;
};

type cards = {
  id: number;
  isPlaying: boolean;
  found: boolean;
  track: Track;
}[];

const GameOver = ({ tracks, solved, moves }: GameOverProps) => {
  const [playingCard, setPlayingCard] = useState("");

  const cards: cards = tracks.map((track, index) => ({
    id: index,
    isPlaying: false,
    found: false,
    track: track,
  }));

  const handleCardClick = (track_url: string) => {
    if (playingCard === track_url) {
      setPlayingCard("");
    } else {
      setPlayingCard(track_url);
    }
  };

  const { setCurrentTrack, isPlaying } = usePlayer();

  useEffect(() => {
    setCurrentTrack(null);
  }, []);

  useEffect(() => {
    if (playingCard !== "") {
      setCurrentTrack({
        preview_url: playingCard,
        startPct: 0,
        endPct: 1,
      });
    } else {
      setCurrentTrack(null);
    }
  }, [playingCard]);

  return (
    <>
      {moves > 0 ? (
        <h2 className="py-2 sm:p-0 font-bold text-gray-500 text-lg sm:text-xl text-center">
          You finished today&apos;s puzzle in {NUM_MOVES - moves} moves!
        </h2>
      ) : (
        <h2 className="text-green-500 text-xl text-center font-bold">
          Nice try!
        </h2>
      )}

      <div className="py-4 w-5/6 sm:w-3/6 lg:w-2/6 m-auto space-y-2">
        {cards.map((card) => {
          let showCard = false;
          const tileTrack = JSON.stringify(card.track);

          for (let track in solved) {
            if (tileTrack === JSON.stringify(solved[track])) {
              showCard = true;
              break;
            }
          }

          return (
            <Card
              id={card.id}
              key={card.id}
              name={card.track.name}
              preview_url={card.track.preview_url}
              track_url={card.track.track_url}
              artists={card.track.artists}
              found={showCard}
              isPlaying={playingCard === card.track.preview_url && isPlaying}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
    </>
  );
};

export default GameOver;
