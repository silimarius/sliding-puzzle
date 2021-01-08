import {
  GameActionTypes,
  GameStatus,
  SET_BOARD_SIZE,
  SET_GAME_STATUS,
  SET_MOVES,
} from "./types";

export const setMoves = (moves: number): GameActionTypes => ({
  type: SET_MOVES,
  moves,
});

export const setBoardSize = (boardSize: number): GameActionTypes => ({
  type: SET_BOARD_SIZE,
  boardSize,
});

export const setGameStatus = (status: GameStatus): GameActionTypes => ({
  type: SET_GAME_STATUS,
  status,
});
