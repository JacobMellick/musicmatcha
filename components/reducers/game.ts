import { Track } from "@/types/proj01";

const orderArray = (array: any[], order: number[]) => {
  const orderedArray = order.map((item) => {
    return array[item];
  });
  return orderedArray;
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
  playingCard?: string | undefined;
  moves: number;
  solved: Track[];
};

type Action =
  | {
      type: "init";
      payload: { order: number[]; solved: Track[]; moves: number };
    }
  | {
      type: "tileClick";
      payload: number;
    }
  | {
      type: "cardClick";
      payload: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "init":
      const unTiles: State["tiles"] = state.tracks.flatMap((track) => [
        {
          id: 0,
          track,
          isSolved: false,
          isPlaying: false,
          startPct: 0.1,
          endPct: 0.3,
        },
        {
          id: 0,
          track,
          isSolved: false,
          isPlaying: false,
          startPct: 0.7,
          endPct: 0.9,
        },
      ]);
      const tiles = orderArray(unTiles, action.payload.order);
      return {
        ...state,
        tiles: tiles.map((tile, index) => ({ ...tile, id: index })),
        selectedTiles: [],
        moves: action.payload.moves,
        solved: action.payload.solved,
      };
    case "tileClick":
      const clickedTile = action.payload;
      let playingTile: number | undefined;
      let selectedTiles: number[] = [];
      let removeTiles: number[] = [];
      let solved: Track[] = [...state.solved];
      let moves = state.moves;
      let playingCard: string | undefined;

      if (clickedTile == state.playingTile) {
        playingTile = undefined;
        if (state.selectedTiles.length == 1) {
          moves--;
        }
        selectedTiles = [];
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
        playingCard = solved[0].preview_url;

        moves++;
      }

      return {
        ...state,
        playingCard,
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
    case "cardClick":
      const clickedCard = action.payload;
      let newCard;
      if (state.playingCard == clickedCard) {
        newCard = undefined;
      } else {
        newCard = clickedCard;
      }

      return {
        ...state,
        playingCard: newCard,
        playingTile: undefined,
      };
  }
};
