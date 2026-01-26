import { getTeams, saveTeams } from "../utils/storage";

export interface Team {
  name: string;
  points: number;
}

export interface TimesUpState {
  teams: Team[];
  currentTeam: string;
  currentCard: string;
  currentDeck: string[];
  round: number;
}

export const getInitialState = (currentDeck: string[]): TimesUpState => {
  const teams = getTeams();
  return {
    teams: teams,
    currentTeam: teams[0].name,
    currentCard: currentDeck[0],
    currentDeck: currentDeck,
    round: 1,
  };
};

export type TimesUpAction =
  | { type: "CORRECT_GUESS"; payload: string[] }
  | { type: "INCORRECT_GUESS"; payload: string[] };

export const timesUpReducer = (
  state: TimesUpState,
  action: TimesUpAction,
): TimesUpState => {
  switch (action.type) {
    case "CORRECT_GUESS": {
      //Si no hay equipo
      if (!state.currentTeam) {
        return state;
      }

      //Comprobación de  nº cartas
      if (state.currentDeck.length == 0) {
        console.log("Se acabó el mazo");
        //Cambiar de ronda
      }

      const upadtedTeams = state.teams.map((team) =>
        team.name == state.currentTeam
          ? { ...team, points: team.points + 1 }
          : team,
      );

      saveTeams(upadtedTeams);

      const updateDeck = state.currentDeck.slice(1);
      return {
        ...state,
        teams: upadtedTeams,
        currentDeck: updateDeck,
        currentCard: updateDeck[0],
      };
    }

    case "INCORRECT_GUESS": {
      if (state.currentDeck.length === 0) return state;
      const updateDeck = [...state.currentDeck];
      const first = updateDeck.shift();
      if (first !== undefined) {
        updateDeck.push(first);
      }
      return {
        ...state,
        currentDeck: updateDeck,
        currentCard: updateDeck[0] || "",
      };
    }

    default:
      return state;
  }
};
