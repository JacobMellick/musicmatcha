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

type HomeProps = {
  tracks: Track[];
};

const Home = ({ tracks }: HomeProps) => {
  const [state, dispatch] = useReducer(reducer, {
    tracks,
    tiles: [],
    selectedTiles: [],
    moves: NUM_MOVES,
    solved: [],
  });

  const [gameOver, setGameOver] = useState(false);

  const { setCurrentTrack } = usePlayer();

  const [scoreColor, setScoreColor] = useState("from-100%");
  const handleScoreColor = () => {
    let direction = "";
    if (state.moves > Math.floor(NUM_MOVES / 2)) {
      direction = "from";
    } else {
      direction = "to";
    }
    let value =
      ((state.moves % Math.floor(NUM_MOVES / 2)) / Math.floor(NUM_MOVES / 2)) *
      100;
    if (value == 0) {
      value = 100;
    }
    let colorString = direction + "-" + value + "%";
    return setScoreColor(() => colorString);
  };
  useEffect(() => {
    handleScoreColor();
  }, [state.moves]);

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
          className={`${
            state.moves > 0
              ? `content-center pt-8 text-center text-4xl bg-gradient-to-r bg-clip-text text-transparent from-green-500 ${scoreColor} to-red-500`
              : "invisible"
          }`}
        >
          {state.moves}
        </div>
        <div className="py-4 flex justify-center"></div>
      </Page>
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
