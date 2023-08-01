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
import GameOver from "@/components/GameOver";

type HomeProps = {
  id: number;
  tracks: Track[];
  order: number[];
};

const Home = ({ id, tracks, order }: HomeProps) => {
  const [state, dispatch] = useReducer(reducer, {
    tracks,
    tiles: [],
    selectedTiles: [],
    moves: NUM_MOVES,
    solved: [],
  });

  const { setCurrentTrack } = usePlayer();

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const localId = localStorage.getItem("id");
    const localMoves = localStorage.getItem("moves");
    const localSolved = localStorage.getItem("solved");
    const localStreak = localStorage.getItem("streak");
    const localPlays = localStorage.getItem("plays");
    const localWins = localStorage.getItem("wins");
    if (
      localId === null ||
      JSON.parse(localId) !== id ||
      localMoves === null ||
      localSolved === null ||
      localStreak === null ||
      localPlays === null ||
      localWins === null
    ) {
      localStorage.setItem("recorded", JSON.stringify("no"));
      localStorage.setItem("solved", JSON.stringify([]));
      localStorage.setItem("moves", JSON.stringify(NUM_MOVES));
      if (localId === null) {
        localStorage.setItem("streak", JSON.stringify(0));
        localStorage.setItem("plays", JSON.stringify(0));
        localStorage.setItem("wins", JSON.stringify(0));
      }

      dispatch({
        type: "init",
        payload: { order: order, solved: [], moves: NUM_MOVES },
      });
    } else {
      dispatch({
        type: "init",
        payload: {
          order: order,
          solved: JSON.parse(localSolved),
          moves: JSON.parse(localMoves),
        },
      });
    }
    if (localId !== null) {
      if (id - JSON.parse(localId) > 1) {
        localStorage.setItem("streak", JSON.stringify(0));
      }
    }
    localStorage.setItem("id", JSON.stringify(id));
  }, []);

  useEffect(() => {
    localStorage.setItem("moves", JSON.stringify(state.moves));
    localStorage.setItem("solved", JSON.stringify(state.solved));
  }, [state]);

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
    const localPlays = localStorage.getItem("plays");
    const localWins = localStorage.getItem("wins");
    const localStreak = localStorage.getItem("streak");
    const localRecorded = localStorage.getItem("recorded");
    let tempRecorded = "no";
    if (localRecorded !== null) {
      if (JSON.parse(localRecorded) !== tempRecorded) {
        tempRecorded = "yes";
      }
    }
    if (tempRecorded === "no") {
      if (state.moves === 0) {
        if (localPlays !== null) {
          let tempPlays = JSON.parse(localPlays);
          tempPlays++;
          localStorage.setItem("plays", JSON.stringify(tempPlays));
          localStorage.setItem("recorded", JSON.stringify("yes"));
        }
      } else if (
        state.solved.length === state.tiles.length / 2 &&
        state.solved.length != 0
      ) {
        localStorage.setItem("recorded", JSON.stringify("yes"));
        if (localPlays !== null) {
          let tempPlays = JSON.parse(localPlays);
          tempPlays++;
          localStorage.setItem("plays", JSON.stringify(tempPlays));
        }
        if (localWins !== null) {
          let tempWins = JSON.parse(localWins);
          tempWins++;
          localStorage.setItem("wins", JSON.stringify(tempWins));
        }
        if (localStreak !== null) {
          let tempStreak = JSON.parse(localStreak);
          tempStreak++;
          localStorage.setItem("streak", JSON.stringify(tempStreak));
        }
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
        endPct: 100,
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
      <Header />
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
                isPlaying={state.playingCard === state.solved[0].preview_url}
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
