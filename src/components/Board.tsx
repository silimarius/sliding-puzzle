import React, { FC, useEffect, useState } from "react";
import styles from "../styles/Board.module.css";
import Square from "../models/Square";

interface BoardProps {
  sideLength: number;
}

const Board: FC<BoardProps> = ({ sideLength }) => {
  const [moves, setMoves] = useState(0);
  const [squares, setSquares] = useState<Square[][]>([]);
  const area = sideLength ** 2;

  // squares initialization
  useEffect(() => {
    const emptyMatrix: Square[][] = Array(sideLength).fill(
      Array(sideLength).fill(undefined)
    );
    const matrix: Square[][] = emptyMatrix.map((row, rowIndex) =>
      row.map((col, colIndex) => ({
        value: sideLength * rowIndex + (colIndex + 1),
      }))
    );
    setSquares(matrix);
  }, [sideLength, area]);

  /**
   * Inverts the position of two squares and returns the resulting matrix if successful
   */
  const invertSquares = (
    row1: number,
    col1: number,
    row2: number,
    col2: number
  ): { squares: Square[][]; success: boolean } => {
    const tmpSquares = [...squares];

    const firstRow = squares[row1];
    const secondRow = squares[row2];

    if (!firstRow || !secondRow) {
      return { squares: tmpSquares, success: false };
    }

    const first = firstRow[col1];
    const second = secondRow[col2];

    if (
      first &&
      second &&
      first.value !== second.value &&
      second.value === area
    ) {
      const pivot = { ...first };
      squares[row1][col1] = { ...second };
      squares[row2][col2] = pivot;
      return { squares: tmpSquares, success: true };
    }
    return { squares: tmpSquares, success: false };
  };

  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    const attempts = [
      invertSquares(rowIndex, colIndex, rowIndex - 1, colIndex),
      invertSquares(rowIndex, colIndex, rowIndex + 1, colIndex),
      invertSquares(rowIndex, colIndex, rowIndex, colIndex + 1),
      invertSquares(rowIndex, colIndex, rowIndex, colIndex - 1),
    ];
    const successfulAttempt = attempts.filter((attempt) => attempt.success)[0];
    if (successfulAttempt) {
      setMoves(moves + 1);
      setSquares(successfulAttempt.squares);
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
                        ? "white"
                        : square.value % 2 === 1
                        ? "grey"
                        : "orange",
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
