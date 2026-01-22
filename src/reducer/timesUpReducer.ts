import { getTeams } from "../utils/storage";

export interface Team {
  name: string;
  points: number;
}

export interface TimesUpState {
  teams: Team[];
  currentTeam: string;
  currentCard: string;
  currentDeck: string;
  round: number;
}

export const getInitialState = (): TimesUpState => {
  const teams = getTeams().map((name) => ({
    name,
    points: 0,
  }));
  return {
    teams: teams,
    currentTeam: teams[0]?.name || "",
    currentCard: "",
    currentDeck: "string",
    round: 1,
  };
};

export type TimesUpAction =
  | { type: "CORRECT_GUESS"; payload: string }
  | { type: "INCORRECT_GUESS"; payload: string }
  | { type: "SKIP_CARD"; payload: string };

export const timesUpReducer = (
  state: TimesUpState,
  action: TimesUpAction,
): TimesUpState => {
  switch (action.type) {
    case "CORRECT_GUESS":
      if (!state.currentTeam) {
        console.log("Vacio");
        return state;
      }
      console.log("No vacio");
      return {
        ...state,
        teams: state.teams.map((team) =>
          team.name == state.currentTeam
            ? { ...team, points: team.points + 1 }
            : team,
        ),
      };

    case "INCORRECT_GUESS":
      return {
        ...state,
      };

    default:
      return state;
  }
};
