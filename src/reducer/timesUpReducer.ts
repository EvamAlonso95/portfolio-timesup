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
  correctCards: string[];
  failedCards: string[];
  round: number;
}

export const getInitialState = (currentDeck: string[]): TimesUpState => {
  const teams = getTeams();
  if (teams.length === 0) {
    // Solo inicializa si no existen

    saveTeams([
      { name: "Equipo 1", points: 0 },
      { name: "Equipo 2", points: 0 },
    ]);
  }

  return {
    teams: teams,
    currentTeam: teams[0].name,
    currentCard: currentDeck[0],
    currentDeck: currentDeck,
    correctCards: [],
    failedCards: [],
    round: 1,
  };
};

export type TimesUpAction =
  | { type: "CORRECT_GUESS"; payload: string[] }
  | { type: "INCORRECT_GUESS"; payload: string[] }
  | { type: "TOGGLE_CARD"; payload: string }
  | { type: "END_ROUND" }
  | { type: "RESET_GAME"; payload: string[] };

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

      const correctCards = [...state.correctCards, state.currentCard];

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
        correctCards: correctCards,
      };
    }

    case "INCORRECT_GUESS": {
      if (state.currentDeck.length === 0) return state;

      const failedCards = [...state.failedCards, state.currentCard];
      const updateDeck = [...state.currentDeck];
      const first = updateDeck.shift();
      if (first !== undefined) {
        updateDeck.push(first);
      }
      return {
        ...state,
        currentDeck: updateDeck,
        currentCard: updateDeck[0] || "",
        failedCards: failedCards,
      };
    }
    case "END_ROUND":
      return {
        ...state,
        teams: state.teams,
        currentTeam: state.teams[1].name,
        currentCard: state.currentDeck[0],
        currentDeck: state.currentDeck,
        correctCards: state.correctCards,
        failedCards: state.failedCards,
        round: 2,
      };

    case "TOGGLE_CARD": {
      const card = action.payload;
      let newCorrectCards = [...state.correctCards];
      let newFailedCards = [...state.failedCards];
      let newTeams = [...state.teams];

      if (state.correctCards.includes(card)) {
        // Mover de correctCards a failedCards y restar puntos
        newCorrectCards = state.correctCards.filter((c) => c !== card);
        newFailedCards = [...state.failedCards, card];
        newTeams = state.teams.map((team) =>
          team.name === state.currentTeam
            ? { ...team, points: team.points - 1 }
            : team,
        );
        saveTeams(newTeams);
      } else if (state.failedCards.includes(card)) {
        // Mover de failedCards a correctCards y sumar puntos
        newFailedCards = state.failedCards.filter((c) => c !== card);
        newCorrectCards = [...state.correctCards, card];
        newTeams = state.teams.map((team) =>
          team.name === state.currentTeam
            ? { ...team, points: team.points + 1 }
            : team,
        );
        saveTeams(newTeams);
      }

      return {
        ...state,
        correctCards: newCorrectCards,
        failedCards: newFailedCards,
        teams: newTeams,
      };
    }
    case "RESET_GAME":
      return getInitialState(action.payload);

    default:
      return state;
  }
};
