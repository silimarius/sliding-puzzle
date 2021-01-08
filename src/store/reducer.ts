import {
  GameActionTypes,
  GameState,
  GameStatus,
  SET_BOARD_SIZE,
  SET_GAME_STATUS,
  SET_MOVES,
} from "./types";

const boardSize = 3;
const moves = 0;
const status = GameStatus.menu;

const defaultState: GameState = { boardSize, moves, status };

const gameData = (state = defaultState, action: GameActionTypes) => {
  switch (action.type) {
    case SET_BOARD_SIZE:
      return { ...state, boardSize: action.boardSize };
    case SET_MOVES:
      return { ...state, moves: action.moves };
    case SET_GAME_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export default gameData;
