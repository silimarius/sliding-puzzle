import React, { FC, useEffect, useMemo, useState } from "react";
import { knuthShuffle } from "knuth-shuffle";
import styles from "../styles/Board.module.css";
import Square from "../models/Square";

interface BoardProps {
  sideLength: number;
}

const Board: FC<BoardProps> = ({ sideLength }) => {
  const [moves, setMoves] = useState(0);
  const [squares, setSquares] = useState<Square[][]>([]);
  const area = useMemo(() => sideLength ** 2, [sideLength]);

  // squares initialization
  useEffect(() => {
    // shuffling process
    const values = Array(area)
      .fill(undefined)
      .map((_, i) => i + 1);
    knuthShuffle(values);
    // matrix creation
    const emptyMatrix: Square[][] = Array(sideLength).fill(
      Array(sideLength).fill(undefined)
    );
    const matrix: Square[][] = emptyMatrix.map((row, rowIndex) =>
      row.map((_, colIndex) => ({
        value: values[sideLength * rowIndex + colIndex],
      }))
    );
    setSquares(matrix);
  }, [sideLength, area]);

  const checkWinCondition = () => {
    const values = squares.flat().map((square) => square.value);
    const isSorted = values.every((value, i, arr) => !i || arr[i - 1] <= value);
    console.log(isSorted);
  };

  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    const invertSquares = (
      rowSwitch: number,
      colSwitch: number
    ): { squares: Square[][]; success: boolean } => {
      const tmpSquares = [...squares];

      const firstRow = squares[rowIndex];
      const secondRow = squares[rowSwitch];

      if (!firstRow || !secondRow) {
        return { squares: tmpSquares, success: false };
      }

      const first = firstRow[colIndex];
      const second = secondRow[colSwitch];

      if (
        first &&
        second &&
        first.value !== second.value &&
        second.value === area
      ) {
        const pivot = { ...first };
        squares[rowIndex][colIndex] = { ...second };
        squares[rowSwitch][colSwitch] = pivot;
        return { squares: tmpSquares, success: true };
      }
      return { squares: tmpSquares, success: false };
    };

    const attempts = [
      invertSquares(rowIndex - 1, colIndex),
      invertSquares(rowIndex + 1, colIndex),
      invertSquares(rowIndex, colIndex + 1),
      invertSquares(rowIndex, colIndex - 1),
    ];
    const successfulAttempt = attempts.filter((attempt) => attempt.success)[0];
    if (successfulAttempt) {
      setMoves(moves + 1);
      setSquares(successfulAttempt.squares);
      checkWinCondition();
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          {squares.map((row, ri) => (
            <tr key={"row" + ri}>
              {row.map((square, si) => (
                <td
                  className={styles.cell}
                  style={{
                    backgroundColor:
                      square.value === area
                        ? "#80cbc4"
                        : square.value % 2 === 1
                        ? "white"
                        : "#ff8a65",
                  }}
                  key={"col" + si}
                  onClick={() => handleSquareClick(ri, si)}
                >
                  {square.value === area ? "" : square.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>Moves: {moves}</p>
    </div>
  );
};

export default Board;
