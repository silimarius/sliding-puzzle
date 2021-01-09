import React, { FC, useMemo } from "react";
import Square from "../models/Square";
import styles from "../styles/Grid.module.css";

interface Props {
  squares: Square[][];
  onSquareClick?: (rowIndex: number, colIndex: number) => void;
}

const Grid: FC<Props> = ({ squares, onSquareClick }) => {
  const cellStyle = useMemo(() => {
    const cellSide = 300 / squares.length;
    return {
      width: cellSide,
      height: cellSide,
    };
  }, [squares]);

  return (
    <table className={styles.table}>
      <tbody>
        {squares.map((row, ri) => (
          <tr key={"row" + ri}>
            {row.map((square, si) => (
              <td
                className={styles.cell}
                style={cellStyle}
                key={"col" + si}
                onClick={() => {
                  if (onSquareClick) {
                    onSquareClick(ri, si);
                  }
                }}
              >
                {square.value !== squares.flat().length && (
                  <img
                    className={styles.image}
                    width="100%"
                    height="100%"
                    src={square.imageSource}
                    alt={"square" + ri + si}
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
