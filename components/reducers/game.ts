import { Track } from "@/types/proj01";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

type State = {
  tracks: Track[];
  tiles: {
    id: number;
    track: Track;
    isSolved: boolean;
    isPlaying: boolean;
    startPct: number;
    endPct: number;
  }[];
  selectedTiles: number[];
  playingTile?: number;
  moves: number;
  solved: Track[];
};

type Action =
  | {
      type: "init";
    }
  | {
      type: "tileClick";
      payload: number;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "init":
      const tiles: State["tiles"] = state.tracks.flatMap((track) => [
        {
          id: 0,
          track,
          isSolved: false,
          isPlaying: false,
          startPct: 0.1,
          endPct: 0.4,
        },
        {
          id: 0,
          track,
          isSolved: false,
          isPlaying: false,
          startPct: 0.6,
          endPct: 0.9,
        },
      ]);
      shuffleArray(tiles);
      return {
        ...state,
        tiles: tiles.map((tile, index) => ({ ...tile, id: index })),
        selectedTiles: [],
      };
    case "tileClick":
      const clickedTile = action.payload;
      let playingTile: number | undefined;
      let selectedTiles: number[] = [];
      let removeTiles: number[] = [];
      let solved: Track[] = [...state.solved];
      let moves = state.moves;

      if (clickedTile == state.playingTile) {
        playingTile = undefined;
        selectedTiles = [];
        moves--;
      } else {
        playingTile = clickedTile;
        if (state.selectedTiles.length == 2) {
          selectedTiles = [clickedTile];
        } else {
          selectedTiles = [...state.selectedTiles, clickedTile];
          if (selectedTiles.length == 2) {
            moves--;
          }
        }
      }

      if (
        selectedTiles.length == 2 &&
        state.tiles[selectedTiles[0]].track.id ==
          state.tiles[selectedTiles[1]].track.id
      ) {
        removeTiles = [...selectedTiles];
        solved = [state.tiles[selectedTiles[0]].track, ...solved];
        selectedTiles = [];

        moves++;
      }

      return {
        ...state,
        selectedTiles: [...selectedTiles],
        playingTile,
        moves,
        solved,
        tiles: state.tiles.map((tile) => ({
          ...tile,
          isPlaying: tile.id == playingTile,
          isSolved: tile.isSolved || removeTiles.includes(tile.id),
        })),
      };
  }
};
