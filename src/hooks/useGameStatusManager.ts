import { useEffect, useRef } from "react";
import { GameStatus } from "../data/game.data";
import type { TimesUpState } from "../reducer/timesUpReducer";

export const useGameStatusManager = (
  state: TimesUpState,
  gameStatus: GameStatus,
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
): void => {
  const prevSizeRef = useRef(state.currentDeck.size);
  useEffect(() => {
    const currentSize = state.currentDeck.size;
    if (
      prevSizeRef.current > 0 &&
      currentSize === 0 &&
      gameStatus !== GameStatus.SELECTION &&
      gameStatus !== GameStatus.END_ROUND
    ) {
      setGameStatus(GameStatus.END_ROUND);
    }
    prevSizeRef.current = currentSize;
  }, [state.currentDeck, gameStatus, setGameStatus]);
};
