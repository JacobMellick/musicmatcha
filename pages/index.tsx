import { useEffect, useReducer, useState } from "react";

import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import Page from "@/components/layout/Page";
import Tile from "@/components/Tile";
import Puzzle from "@/data/puzzle.json";
import type { Track } from "@/types/proj01";
import { usePlayer } from "@/context/PlayerContext";

import { reducer } from "@/components/reducers/game";

type HomeProps = {
  tracks: Track[];
};

const Home = ({ tracks }: HomeProps) => {
  const [state, dispatch] = useReducer(reducer, {
    tracks,
    tiles: [],
    selectedTiles: [],
    moves: 10,
    solved: [],
  });

  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const { setCurrentTrack } = usePlayer();

  const colorList = [
    "text-[#77A769]",
    "text-[#84955E]",
    "text-[#8E8756]",
    "text-[#97794D]",
    "text-[#A26944]",
    "text-[#AE5739]",
    "text-[#BB452E]",
    "text-[#C63424]",
    "text-[#D1231A]",
    "text-[#E00D0D]",
  ];

  const [scoreColor, setScoreColor] = useState(colorList[0]);

  const handleScoreChange = () => {
    setScoreColor(() => {
      return colorList[colorList.length - state.moves];
    });
  };

  useEffect(handleScoreChange, [state.moves]);

  const handleTileClick = (id: number) => {
    dispatch({ type: "tileClick", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "init" });
  }, []);

  useEffect(() => {
    if (typeof state.playingTile !== "undefined") {
      setCurrentTrack({
        preview_url: state.tiles[state.playingTile].track.preview_url,
        startPct: state.tiles[state.playingTile].startPct,
        endPct: state.tiles[state.playingTile].endPct,
      });
    } else {
      setCurrentTrack(null);
    }
  }, [state.playingTile, state.tiles, setCurrentTrack]);

  return (
    <Layout>
      {gameStart ? (
        <>
          <Header />
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
            <div
              className={`py-8 w-full text-center text-4xl font-light ${scoreColor}`}
            >
              {state.moves}
            </div>
          </Page>
        </>
      ) : (
        <Page title="Start">
          <div className="flex flex-col h-screen bg-aliceblue px-2 justify-center">
            <h1 className="text-4xl pb-4 text-center font-light">musicmatch</h1>
            <h3 className="text-2xl text-center font-light pb-4">
              Can you match all eight songs?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center">
              <button
                className="m-4 text-white bg-orange-400 hover:bg-orange-600 py-2 px-8 rounded"
                onClick={() => setGameStart(true)}
              >
                Start Game
              </button>
              <button className="m-4 py-2 px-8 rounded border-2 border-slate-600">
                How to Play
              </button>
              <button className="m-4 py-2 px-8 rounded border-2 border-slate-600">
                Submit Puzzle
              </button>
            </div>
          </div>
        </Page>
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
