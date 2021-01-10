import Square from "../models/Square";

export const generateMatrix = (
  sideLength: number,
  values: number[],
  images: string[]
): Square[][] => {
  const area = sideLength ** 2;
  const emptyMatrix: Square[][] = Array(sideLength).fill(
    Array(sideLength).fill(undefined)
  );
  const matrix: Square[][] = emptyMatrix.map((row, rowIndex) =>
    row.map((_, colIndex) => {
      const value = values[sideLength * rowIndex + colIndex];
      return {
        value,
        imageSource: images[value - 1],
        isEmpty: area === value,
      };
    })
  );
  return matrix;
};

export const invertSquares = (
  rowSwitch: number,
  colSwitch: number,
  matrixState: {
    matrix: Square[][];
    rowIndex: number;
    colIndex: number;
  }
): { matrix: Square[][]; success: boolean } => {
  const { matrix, rowIndex, colIndex } = matrixState;
  const tmpMatrix = [...matrix];

  const firstRow = matrix[rowIndex];
  const secondRow = matrix[rowSwitch];

  if (!firstRow || !secondRow) {
    return { matrix: tmpMatrix, success: false };
  }

  const first = firstRow[colIndex];
  const second = secondRow[colSwitch];

  if (first && second && first.value !== second.value && second.isEmpty) {
    const pivot = { ...first };
    matrix[rowIndex][colIndex] = { ...second };
    matrix[rowSwitch][colSwitch] = pivot;
    return { matrix: tmpMatrix, success: true };
  }
  return { matrix: tmpMatrix, success: false };
};
