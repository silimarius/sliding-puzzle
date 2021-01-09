export const splitImage = async (
  src: string,
  sideLength: number
): Promise<string[]> =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = cutImageUp;
    image.src = src;
    const imagePieces: string[] = [];

    function cutImageUp() {
      const pieceSize = 500 / sideLength;
      for (let y = 0; y < sideLength; ++y) {
        for (let x = 0; x < sideLength; ++x) {
          const canvas = document.createElement("canvas");
          canvas.width = pieceSize;
          canvas.height = pieceSize;
          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(
              image,
              x * pieceSize,
              y * pieceSize,
              pieceSize,
              pieceSize,
              0,
              0,
              canvas.width,
              canvas.height
            );
            imagePieces.push(canvas.toDataURL());
          }
        }
      }
      resolve(imagePieces);
    }
  });
