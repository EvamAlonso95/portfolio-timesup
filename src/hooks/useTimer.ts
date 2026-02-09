import { useEffect, useState, useCallback } from "react";
// import { TeamNames } from "../data/teamNames.data";
import { GameStatus } from "../data/game.data";

const initialSeconds = 3;

export const useTimer = ({
  gameStatus,
  onTimeout,
}: {
  gameStatus: GameStatus;
  onTimeout?: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    let interval: number | null = null;

    // Solo corre el timer si estamos en una ronda activa
    if (
      gameStatus === GameStatus.ROUND_1 ||
      gameStatus === GameStatus.ROUND_2 ||
      gameStatus === GameStatus.ROUND_3
    ) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (onTimeout) onTimeout();

            return initialSeconds; // Reinicia el timer
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStatus, onTimeout]); // Dependencia correcta

  const resetTimer = useCallback(() => {
    setTimeLeft(initialSeconds);
  }, []);

  return {
    timeLeft,
    // team,
    resetTimer,
  };
};
