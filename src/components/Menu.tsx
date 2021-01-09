import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoardSize, setGameStatus } from "../store/actions";
import { GameState, GameStatus } from "../store/types";
import styles from "../styles/Menu.module.css";

const Menu = () => {
  const dispatch = useDispatch();
  const boardSize = useSelector((state: GameState) => state.boardSize);

  const updateBoardSize = (increment: boolean) => {
    if (increment && boardSize < 6) {
      dispatch(setBoardSize(boardSize + 1));
    }
    if (!increment && boardSize > 3) {
      dispatch(setBoardSize(boardSize - 1));
    }
  };

  return (
    <>
      <h2>Sliding Puzzle</h2>

      <div className={styles.size}>
        <h2 className={styles.increase} onClick={() => updateBoardSize(false)}>
          -
        </h2>
        <h3>
          {boardSize}x{boardSize}
        </h3>
        <h2 className={styles.decrease} onClick={() => updateBoardSize(true)}>
          +
        </h2>
      </div>

      <button onClick={() => dispatch(setGameStatus(GameStatus.playing))}>
        Start
      </button>
    </>
  );
};

export default Menu;
