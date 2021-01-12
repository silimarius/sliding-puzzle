import React, { FC, useEffect, useMemo, useState } from "react";
import { knuthShuffle } from "knuth-shuffle";
import Square from "../models/Square";
import { useDispatch, useSelector } from "react-redux";
import { GameState, GameStatus } from "../store/types";
import { setMoves, setGameStatus } from "../store/actions";
import gameImage from "../img/flowers.jpg";
import { splitImage } from "../utils/image";
import Grid from "./Grid";
import { generateMatrix, invertSquares } from "../utils/matrix";

const Board: FC = () => {
  const dispatch = useDispatch();
  const [squares, setSquares] = useState<Square[][]>([]);
  const [orderedSquares, setOrderedSquares] = useState<Square[][]>([]);
  const [peeking, setPeeking] = useState(false);

  const sideLength = useSelector((state: GameState) => state.boardSize);
  const moves = useSelector((state: GameState) => state.moves);

  const area = useMemo(() => sideLength ** 2, [sideLength]);

  // squares initialization
  useEffect(() => {
    const initMatrix = async () => {
      const images = await splitImage(gameImage, sideLength);
      // shuffling process
      const values = Array(area)
        .fill(undefined)
        .map((_, i) => i + 1);
      const orderedMatrix = generateMatrix(sideLength, values, images);
      knuthShuffle(values);
      const matrix = generateMatrix(sideLength, values, images);
      // matrix creation
      setOrderedSquares(orderedMatrix);
      setSquares(matrix);
    };
    initMatrix();
  }, [sideLength, area]);

  const checkWinCondition = () => {
    const values = squares.flat().map((square) => square.value);
    const isSorted = values.every((value, i, arr) => !i || arr[i - 1] <= value);
    if (isSorted) {
      dispatch(setGameStatus(GameStatus.won));
    }
  };

  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    const matrixState = { matrix: squares, rowIndex, colIndex };
    const attempts = [
      invertSquares(rowIndex - 1, colIndex, matrixState),
      invertSquares(rowIndex + 1, colIndex, matrixState),
      invertSquares(rowIndex, colIndex + 1, matrixState),
      invertSquares(rowIndex, colIndex - 1, matrixState),
    ];
    const successfulAttempt = attempts.filter((attempt) => attempt.success)[0];
    if (successfulAttempt) {
      dispatch(setMoves(moves + 1));
      setSquares(successfulAttempt.matrix);
      checkWinCondition();
    }
  };

  return (
    <>
      {squares.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={() => setPeeking(!peeking)}>
            {!peeking ? "Peek Result" : "Stop Peeking"}
          </button>
          <br />
          {peeking ? (
            <Grid squares={orderedSquares} />
          ) : (
            <Grid squares={squares} onSquareClick={handleSquareClick} />
          )}
          <p>Moves: {moves}</p>
        </>
      )}
    </>
  );
};

export default Board;
