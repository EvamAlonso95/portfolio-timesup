export const GameStatus = {
  SELECTION: "SELECTION",
  RULES: "RULES",
  END_ROUND: "END_ROUND",
  ROUND_1: "ROUND_1",
  ROUND_2: "ROUND_2",
  ROUND_3: "ROUND_3",
  FINISHED: "FINISHED",
} as const;

export type GameStatus = (typeof GameStatus)[keyof typeof GameStatus];
