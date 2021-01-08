import React from "react";
import { useSelector } from "react-redux";
import { GameState, GameStatus } from "../store/types";
import Board from "./Board";
import Menu from "./Menu";
import styles from "../styles/Game.module.css";
import WinMessage from "./WinMessage";

const Game = () => {
  const status = useSelector((state: GameState) => state.status);

  const getPage = () => {
    switch (status) {
      case GameStatus.menu:
        return <Menu />;
      case GameStatus.playing:
        return <Board />;
      case GameStatus.won:
        return <WinMessage />;
    }
  };

  return <div className={styles.container}>{getPage()}</div>;
};

export default Game;
