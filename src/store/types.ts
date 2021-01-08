export const SET_BOARD_SIZE = "SET_BOARD_SIZE";
export const SET_MOVES = "SET_MOVES";
export const SET_GAME_STATUS = "SET_GAME_STATUS";

export enum GameStatus {
  menu,
  playing,
  won,
}

interface SetBoardSizeAction {
  type: typeof SET_BOARD_SIZE;
  boardSize: number;
}

interface SetMovesAction {
  type: typeof SET_MOVES;
  moves: number;
}

interface SetGameStatusAction {
  type: typeof SET_GAME_STATUS;
  status: GameStatus;
}

export type GameActionTypes =
  | SetBoardSizeAction
  | SetMovesAction
  | SetGameStatusAction;

export interface GameState {
  boardSize: number;
  moves: number;
  status: GameStatus;
}
