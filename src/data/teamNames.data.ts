export const TeamNames = {
  EQUIPO_1: "Equipo 1",
  EQUIPO_2: "Equipo 2",
} as const;

export type TeamNames = (typeof TeamNames)[keyof typeof TeamNames];
