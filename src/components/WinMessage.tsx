import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameStatus, setMoves } from "../store/actions";
import { GameState, GameStatus } from "../store/types";

const WinMessage = () => {
  const dispatch = useDispatch();
  const moves = useSelector((state: GameState) => state.moves);

  const handleReplay = () => {
    dispatch(setMoves(0));
    dispatch(setGameStatus(GameStatus.menu));
  };

  return (
    <>
      <h2>Congratulations!</h2>
      <h4>You finished the game in {moves} moves</h4>
      <button onClick={() => handleReplay()}>Replay</button>
    </>
  );
};

export default WinMessage;
