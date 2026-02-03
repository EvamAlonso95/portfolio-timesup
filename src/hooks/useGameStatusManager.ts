import { useEffect, useRef } from "react";
import { GameStatus } from "../data/game.data";
import type { TimesUpAction, TimesUpState } from "../reducer/timesUpReducer";
import { savePrevGameStatus } from "../utils/storage";

export const useGameStatusManager = (
  state: TimesUpState,
  gameStatus: GameStatus,
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
  gameCards: string[],
  dispatch: React.Dispatch<TimesUpAction>,
): void => {
  const prevSizeRef = useRef(state.currentDeck.size);
  useEffect(() => {
    const currentSize = state.currentDeck.size;
    if (
      prevSizeRef.current > 0 &&
      currentSize === 0 &&
      gameStatus !== GameStatus.SELECTION
    ) {
      console.log("El estado actual si se acaba la baraja es:", gameStatus);
      savePrevGameStatus(gameStatus);
      setGameStatus(GameStatus.END_ROUND);
      //! REVISAR
      dispatch({ type: "END_ROUND", payload: gameCards });
    }
    prevSizeRef.current = currentSize;
  }, [state.currentDeck, gameStatus, setGameStatus, gameCards, dispatch]);
};
