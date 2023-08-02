import { useEffect, useReducer, useState } from "react";

import Card from "@/components/cards/Card";
import GameOver from "@/components/GameOver";
import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import Page from "@/components/layout/Page";
import { reducer } from "@/components/reducers/game";
import Tile from "@/components/Tile";
import { usePlayer } from "@/context/PlayerContext";
import Puzzle from "@/data/puzzle.json";
import useLocalStorage from "@/hooks/useLocalStorage";
import { NUM_MOVES } from "@/lib/constants";

import type { Track } from "@/types/proj01";

type HomeProps = {
  id: number;
  tracks: Track[];
  order: number[];
};

interface LocalDataLayout {
  id: number;
  moves: number;
  solved: Track[];
  streak: number;
  plays: number;
  wins: number;
  recorded: boolean;
  started: boolean;
  [key: string]: unknown;
}

const Home = ({ id, tracks, order }: HomeProps) => {
  const [localData, saveLocalData] = useLocalStorage<LocalDataLayout>(
    "musicmatcha",
    {
      id: id,
      moves: NUM_MOVES,
      solved: [],
      streak: 0,
      plays: 0,
      wins: 0,
      recorded: false,
      started: false,
    }
  );
  const [state, dispatch] = useReducer(reducer, {
    tracks,
    tiles: [],
    selectedTiles: [],
    moves: NUM_MOVES,
    solved: [],
  });

  const { setCurrentTrack, isPlaying } = usePlayer();

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (id !== localData.id) {
      saveLocalData({
        ...localData,
        moves: NUM_MOVES,
        solved: [],
        recorded: false,
        started: false,
      });
    }

    dispatch({
      type: "init",
      payload: {
        order: order,
        solved: localData.solved,
        moves: localData.moves,
      },
    });

    if (id - localData.id > 1) {
      saveLocalData({ ...localData, streak: 0 });
    }
    saveLocalData({ ...localData, id: id });
  }, []);

  useEffect(() => {
    saveLocalData({ ...localData, moves: state.moves, solved: state.solved });
    if (!localData.started && state.solved.length > 0) {
      saveLocalData({ ...localData, started: true });
    }
  }, [state.solved, state.moves]);

  const handleTileClick = (id: number) => {
    dispatch({ type: "tileClick", payload: id });
  };

  const handleCardClick = (id: string) => {
    dispatch({ type: "cardClick", payload: id });
  };

  const checkGameOver = () => {
    if (
      state.moves === 0 ||
      (state.solved.length === state.tiles.length / 2 &&
        state.solved.length != 0)
    ) {
      setGameOver(true);
    }
  };

  useEffect(() => checkGameOver(), [state.solved]);

  useEffect(() => {
    if (!localData.recorded) {
      if (state.moves === 0) {
        saveLocalData({
          ...localData,
          plays: localData.plays + 1,
          recorded: true,
          streak: 0,
        });
      } else if (
        state.solved.length === state.tiles.length / 2 &&
        state.solved.length !== 0
      ) {
        saveLocalData({
          ...localData,
          plays: localData.plays + 1,
          wins: localData.wins + 1,
          streak: localData.streak + 1,
          recorded: true,
        });
      }
    }
  }, [gameOver]);

  useEffect(() => {
    if (
      typeof state.playingTile !== "undefined" &&
      state.moves > 0 &&
      state.solved.length < 8
    ) {
      setCurrentTrack({
        preview_url: state.tiles[state.playingTile].track.preview_url,
        startPct: state.tiles[state.playingTile].startPct,
        endPct: state.tiles[state.playingTile].endPct,
      });
    } else if (
      typeof state.playingCard !== "undefined" &&
      state.solved.length < 8
    ) {
      setCurrentTrack({
        preview_url: state.playingCard,
        startPct: 0,
        endPct: 1,
      });
    } else {
      setCurrentTrack(null);
    }
  }, [
    state.playingTile,
    state.tiles,
    setCurrentTrack,
    gameOver,
    state.playingCard,
  ]);

  return (
    <Layout>
      <Header
        started={localData.started}
        recorded={localData.recorded}
        solved={localData.solved}
        wins={localData.wins}
        plays={localData.plays}
        streak={localData.streak}
      />
      {!gameOver ? (
        <Page title="Home">
          <div className="flex justify-center w-screen pt-8 sm:pt-0">
            <div className="grid grid-cols-4 gap-2 sm:gap-4 p-8 bg-neutral-100 rounded-lg">
              {state.tiles.map((tile, index) => {
                let showTile = true;
                const tileTrack = JSON.stringify(tile.track);

                for (let track in state.solved) {
                  if (tileTrack === JSON.stringify(state.solved[track])) {
                    showTile = false;
                  }
                }
                return (
                  <Tile
                    key={index}
                    id={index}
                    showTile={showTile}
                    isPlaying={tile.isPlaying}
                    isSelected={state.selectedTiles.includes(index)}
                    onClick={handleTileClick}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-8 flex justify-center items-center">
            <div
              className={`flex text-center justify-center items-center font-medium text-4xl text-green-500 bg-neutral-100 rounded-lg w-16 h-16`}
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
                onClick={handleCardClick}
                isPlaying={
                  state.playingCard === state.solved[0].preview_url && isPlaying
                }
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
      id: Puzzle.id,
      tracks: Puzzle.tracks,
      order: Puzzle.order,
    },
  };
}

export default Home;
