import { useEffect, useReducer, useState } from "react";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import Page from "@/components/layout/Page";
import Tile from "@/components/Tile";
import Puzzle from "@/data/puzzle.json";
import type { Track } from "@/types/proj01";
import { usePlayer } from "@/context/PlayerContext";

import { reducer } from "@/components/reducers/game";

import { NUM_MOVES } from "@/lib/constants";
import Card from "@/components/cards/Card";

type HomeProps = {
  tracks: Track[];
};

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

  const { setCurrentTrack } = usePlayer();

  useEffect(() => {
    setCurrentTrack(null);
  }, []);

  useEffect(() => {
    if (playingCard !== "") {
      setCurrentTrack({
        preview_url: playingCard,
        startPct: 0,
        endPct: 100,
      });
    } else {
      setCurrentTrack(null);
    }
  }, [playingCard]);

  return (
    <>
      {moves > 0 ? (
        <h2 className="font-bold text-green-500 text-xl text-center">
          You finished today's puzzle in {NUM_MOVES - moves} moves!
        </h2>
      ) : (
        <h2 className="text-green-500 text-xl text-center font-bold">
          Nice try!
        </h2>
      )}

      <div className="py-4 w-5/6 sm:w-3/6 lg:w-2/6 m-auto space-y-4">
        {cards.map((card) => (
          <Card
            id={card.id}
            key={card.id}
            name={card.track.name}
            preview_url={card.track.preview_url}
            track_url={card.track.track_url}
            artists={card.track.artists}
            found={solved.includes(card.track)}
            isPlaying={playingCard === card.track.preview_url}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </>
  );
};

const Home = ({ tracks }: HomeProps) => {
  const [state, dispatch] = useReducer(reducer, {
    tracks,
    tiles: [],
    selectedTiles: [],
    moves: NUM_MOVES,
    solved: [],
  });

  const { setCurrentTrack } = usePlayer();

  const handleTileClick = (id: number) => {
    dispatch({ type: "tileClick", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "init" });
  }, []);

  const [gameOver, setGameOver] = useState(false);

  const checkGameOver = () => {
    if (
      state.moves == 0 ||
      (state.solved.length == state.tiles.length / 2 &&
        state.solved.length != 0)
    ) {
      setGameOver(true);
    }
  };

  useEffect(() => checkGameOver(), [state.solved]);

  useEffect(() => {
    if (
      typeof state.playingTile !== "undefined" &&
      state.moves > 0 &&
      state.solved.length < 8
    ) {
      console.log(state.solved.length);
      console.log(gameOver);
      console.log("playing");
      setCurrentTrack({
        preview_url: state.tiles[state.playingTile].track.preview_url,
        startPct: state.tiles[state.playingTile].startPct,
        endPct: state.tiles[state.playingTile].endPct,
      });
    } else {
      setCurrentTrack(null);
    }
  }, [state.playingTile, state.tiles, setCurrentTrack, gameOver]);

  return (
    <Layout>
      <Header />
      {!gameOver ? (
        <Page title="Home">
          <div className="flex justify-center w-screen pt-8 sm:pt-0">
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {state.tiles.map((tile, index) => (
                <Tile
                  key={index}
                  id={index}
                  showTile={!tile.isSolved}
                  isPlaying={tile.isPlaying}
                  isSelected={state.selectedTiles.includes(index)}
                  onClick={handleTileClick}
                />
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-center items-center">
            <div
              className={`p-4 text-center font-medium text-4xl xl:text-6xl text-red-500`}
            >
              {state.moves}
            </div>
          </div>

          <div className="py-4 w-5/6 sm:w-3/6 lg:w-2/6 m-auto space-y-4">
            {state.solved.length != 0 && (
              <Card
                id={0}
                key={state.solved[0].name}
                name={state.solved[0].name}
                track_url={state.solved[0].track_url}
                preview_url={state.solved[0].preview_url}
                artists={state.solved[0].artists}
                onClick={() => {
                  setCurrentTrack({
                    preview_url: state.solved[0].preview_url,
                    startPct: 0,
                    endPct: 100,
                  });
                }}
                isPlaying={true}
                found={true}
              />
            )}
          </div>
        </Page>
      ) : (
        <GameOver
          tracks={state.tracks}
          solved={state.solved}
          moves={state.moves}
        />
      )}
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      tracks: Puzzle,
    },
  };
}

export default Home;
