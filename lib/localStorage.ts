import { Track } from "@/types/proj01";
import { NUM_MOVES } from "./constants";

export type Gamestate = {
  solved: Track[];
  moves: number;
};

export type GameStats = {
  plays: number;
  streak: number;
  wins: number;
  recorded: boolean;
};

export const setLocalGamestate = (val: Gamestate) => {
  localStorage.setItem("musicmatcha", JSON.stringify(val));
};

export const getLocalGamestate = () => {
  if (typeof window !== "undefined") {
    const state = localStorage.getItem("musicmatcha");
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
      : { plays: 0, streak: 0, wins: 0, recorded: false };
  }
  return { plays: 0, streak: 0, wins: 0, recorded: false };
};
