import { useEffect, useReducer, useState } from "react";

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
    }
  }, [state.playingTile, state.tiles, setCurrentTrack]);

  return (
    <Layout>
      <Page title="Home">
        <div className="flex justify-center w-screen">
          <div className="grid grid-cols-4 gap-4">
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
