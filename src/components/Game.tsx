import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { GameState, GameStatus } from "../store/types";
import Board from "./Board";
import Menu from "./Menu";
import styles from "../styles/Game.module.css";
import WinMessage from "./WinMessage";

const Game = () => {
  const status = useSelector((state: GameState) => state.status);

  const page = useMemo(() => {
    switch (status) {
      case GameStatus.menu:
        return <Menu />;
      case GameStatus.playing:
        return <Board />;
      case GameStatus.won:
        return <WinMessage />;
    }
  }, [status]);

  return <div className={styles.container}>{page}</div>;
};

export default Game;
