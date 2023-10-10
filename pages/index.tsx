import { useEffect, useReducer, useState } from "react";

import Card from "@/components/cards/Card";
import GameOver from "@/components/GameOver";
import Header from "@/components/layout/Header";
import Layout from "@/components/layout/Layout";
import Page from "@/components/layout/Page";
import { reducer } from "@/components/reducers/game";
import Tile from "@/components/Tile";
import { usePlayer } from "@/context/PlayerContext";
import Genres from "@/lib/genres.json";
import { NUM_MOVES } from "@/lib/constants";
import supabase from "@/lib/supabase";

import type { Track } from "@/types/proj01";
import {
  getLocalGamestate,
  setLocalGamestate,
  getLocalGameStats,
  setLocalGameStats,
  GameStats,
} from "@/lib/localStorage";

type Puzzle = {
  tracks: Track[];
  order: number[];
};

type HomeProps = {
  id: number;
  puzzles: Record<string, Puzzle>;
};

const numberObj: { [key: number]: number } = {};

for (let i = 16; i > 0; i--) {
  numberObj[i] = 0;
}

const orderTemplate: number[] = [];

for (let i = 0; i < 16; i++) {
  orderTemplate.push(i);
}

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Home = ({ id, puzzles }: HomeProps) => {
  const [playerStats, setPlayerStats] = useState<GameStats>({
    plays: 0,
    wins: 0,
    streak: 0,
    recorded: false,
    stats: numberObj,
  });

  const [genre, setGenre] = useState<string>("pop");

  const [state, dispatch] = useReducer(reducer, {
    tracks: [],
    tiles: [],
    selectedTiles: [],
    moves: NUM_MOVES,
    solved: [],
  });

  const { setCurrentTrack, isPlaying } = usePlayer();

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const localId = localStorage.getItem("id");
    const localParsed = localId ? JSON.parse(localId) : id;

    let localState = getLocalGamestate(genre);
    let localStats = getLocalGameStats();
    let localToChange = { ...localStats };

    if (id !== localParsed) {
      const streak = id - localParsed > 1 ? 0 : localStats.streak;
      setLocalGamestate(genre, {
        moves: NUM_MOVES,
        solved: [],
      });
      setLocalGameStats({
        ...localStats,
        streak,
        recorded: false,
      });
      localToChange = { ...localStats, streak, recorded: false };
    }

    localState = getLocalGamestate(genre);
    localStats = getLocalGameStats();

    dispatch({
      type: "init",
      payload: {
        tracks: puzzles[genre].tracks,
        order: puzzles[genre].order,
        solved: localState.solved,
        moves: localState.moves,
      },
    });

    localStorage.setItem("id", JSON.stringify(id));

    setPlayerStats({ ...localToChange });
  }, [genre]);

  useEffect(() => {
    console.log(state);
    setLocalGamestate(genre, {
      moves: state.moves,
      solved: state.solved,
    });
  }, [genre, state.solved, state.moves]);

  const handleTileClick = (id: number) => {
    if (
      state.playingTile === id ||
      (state.solved.length === 7 && state.selectedTiles.length === 1)
    ) {
      setCurrentTrack(null);
    } else if (
      state.selectedTiles.length === 1 &&
      state.tiles[id].track === state.tiles[state.selectedTiles[0]].track
    ) {
      setCurrentTrack(null);
    } else {
      setCurrentTrack({
        preview_url: state.tiles[id].track.preview_url,
        startPct: state.tiles[id].startPct,
        endPct: state.tiles[id].endPct,
      });
    }
    dispatch({ type: "tileClick", payload: id });
  };

  const handleCardClick = (id: string) => {
    if (
      state.playingCard === id ||
      (state.solved.length === 7 && state.selectedTiles.length === 1)
    ) {
      setCurrentTrack(null);
    } else {
      setCurrentTrack({ preview_url: id, startPct: 0, endPct: 1 });
    }
    dispatch({ type: "cardClick", payload: id });
  };

  useEffect(() => {
    if (
      state.moves === 0 ||
      (state.solved.length === state.tiles.length / 2 &&
        state.solved.length != 0)
    ) {
      setGameOver(true);
    } else if (
      !(
        state.moves === 0 ||
        (state.solved.length === state.tiles.length / 2 &&
          state.solved.length != 0)
      )
    ) {
      setGameOver(false);
    }
  }, [state.moves, state.solved, state.tiles]);

  useEffect(() => {
    const localStats = getLocalGameStats();

    if (!localStats.recorded) {
      if (state.moves === 0) {
        const loseObj = {
          ...localStats,
          plays: localStats.plays + 1,
          recorded: true,
        };
        setLocalGameStats(loseObj);
        setPlayerStats(loseObj);
      } else if (
        state.solved.length === state.tiles.length / 2 &&
        state.solved.length !== 0
      ) {
        const winObj = {
          ...localStats,
          wins: localStats.wins + 1,
          plays: localStats.plays + 1,
          streak: localStats.streak + 1,
          recorded: true,
          stats: {
            ...localStats.stats,
            [state.moves]: localStats.stats[state.moves] + 1,
          },
        };
        setLocalGameStats(winObj);
        setPlayerStats(winObj);
      }
    }
  }, [gameOver]);

  return (
    <Layout>
      <Header
        recorded={playerStats.recorded}
        wins={playerStats.wins}
        plays={playerStats.plays}
        streak={playerStats.streak}
        stats={playerStats.stats}
      />
      <select value={genre} onChange={(event) => setGenre(event.target.value)}>
        {Object.keys(puzzles).map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      {!gameOver ? (
        <Page title="Home">
          <div className="flex justify-center pt-8 sm:pt-0">
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
          <div className="mt-4 flex justify-center items-center">
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
                preview_url={state.solved[0].preview_url || ""}
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

function getRandomTracks(genre: string) {
  return supabase.from("random_track").select("*").eq("genre", genre).limit(8);
}

export async function getStaticProps() {
  const genreTracks = await Promise.all(
    Genres.map(async (genre) => ({
      genre: genre,
      data: await getRandomTracks(genre),
    }))
  );

  let game = { id: 0, puzzles: {} };
  for (const record of genreTracks) {
    game.puzzles = {
      ...game.puzzles,
      [record.genre]: {
        tracks: record.data.data
          ? record.data.data.map((track) => ({
              name: track.name,
              track_url: track.track_url,
              preview_url: track.preview_url,
              artists: track.artists,
            }))
          : null,
        order: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      },
    };
  }

  console.log(game);
  return {
    props: {
      id: game.id,
      puzzles: game.puzzles,
    },
  };
}

export default Home;
