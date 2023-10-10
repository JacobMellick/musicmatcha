import { Track } from "@/types/proj01";
import { NUM_MOVES } from "./constants";

const numberObj: { [key: number]: number } = {};

for (let i = 16; i > 0; i--) {
  numberObj[i] = 0;
}

export type Gamestate = {
  solved: Track[];
  moves: number;
};

export type GameStats = {
  plays: number;
  streak: number;
  wins: number;
  recorded: boolean;
  stats: { [key: number]: number };
};

export const setLocalGamestate = (genre: string, val: Gamestate) => {
  localStorage.setItem(`musicmatcha.${genre}`, JSON.stringify(val));
};

export const getLocalGamestate = (genre: string) => {
  if (typeof window !== "undefined") {
    const state = localStorage.getItem(`musicmatcha.${genre}`);
    return state
      ? (JSON.parse(state) as Gamestate)
      : { solved: [], moves: NUM_MOVES };
  }
  return { solved: [], moves: NUM_MOVES };
};

export const setLocalGameStats = (val: GameStats) => {
  localStorage.setItem("gameStats", JSON.stringify(val));
};

export const getLocalGameStats = () => {
  if (typeof window !== "undefined") {
    const state = localStorage.getItem("gameStats");
    return state
      ? (JSON.parse(state) as GameStats)
      : { plays: 0, streak: 0, wins: 0, recorded: false, stats: numberObj };
  }
  return { plays: 0, streak: 0, wins: 0, recorded: false, stats: numberObj };
};
