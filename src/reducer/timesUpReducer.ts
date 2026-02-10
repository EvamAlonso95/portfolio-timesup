import { TeamNames } from "../data/teamNames.data";
import { getTeams, saveTeams } from "../utils/storage";

export interface Team {
  name: string;
  points: number;
}

export interface TimesUpState {
  teams: Team[];
  currentTeam: string;
  currentCard: string;
  currentDeck: Set<string>;
  correctCards: Set<string>;
  failedCards: Set<string>;
  // round: number;
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
    currentDeck: new Set(currentDeck),
    correctCards: new Set<string>(),
    failedCards: new Set<string>(),
    // round: 1,
  };
};

export type TimesUpAction =
  | { type: "CORRECT_GUESS"; payload: string[] }
  | { type: "INCORRECT_GUESS"; payload: string[] }
  | { type: "TOGGLE_CARD"; payload: string }
  | { type: "RESUME_ROUND" }
  | { type: "NEXT_ROUND" }
  | { type: "RESET_DECK"; payload: string[] }
  | { type: "END_ROUND"; payload: string[] }
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
      if (state.currentDeck.size === 0) {
        console.log("Se acabó el mazo");
        return state;
      }

      const correctCards = new Set(state.correctCards);
      correctCards.add(state.currentCard);

      // Asegurar que la carta no esté en falladas
      const failedCards = new Set(state.failedCards);
      failedCards.delete(state.currentCard);

      const upadtedTeams = state.teams.map((team) =>
        team.name == state.currentTeam
          ? { ...team, points: team.points + 1 }
          : team,
      );

      saveTeams(upadtedTeams);

      const deckArray = Array.from(state.currentDeck);
      deckArray.shift();
      const updateDeck = new Set(deckArray);
      return {
        ...state,
        teams: upadtedTeams,
        currentDeck: updateDeck,
        currentCard: deckArray[0] || "",
        correctCards: correctCards,
        failedCards: failedCards,
      };
    }

    case "INCORRECT_GUESS": {
      if (state.currentDeck.size === 0) return state;

      const failedCards = new Set(state.failedCards);
      failedCards.add(state.currentCard);

      // Asegurar que la carta no esté en correctas
      const correctCards = new Set(state.correctCards);
      correctCards.delete(state.currentCard);

      const updateDeck = [...state.currentDeck];
      const first = updateDeck.shift();
      if (first !== undefined) {
        updateDeck.push(first);
      }
      return {
        ...state,
        currentDeck: new Set(updateDeck),
        currentCard: updateDeck[0] || "",
        correctCards: correctCards,
        failedCards: failedCards,
      };
    }
    // ALterno equipos en la FASE
    case "NEXT_ROUND": {
      const getUpdatedTeam = (currentTeam: string): TeamNames => {
        return currentTeam === TeamNames.EQUIPO_1
          ? TeamNames.EQUIPO_2
          : TeamNames.EQUIPO_1;
      };

      // Uso:
      const updatedTeam = getUpdatedTeam(state.currentTeam);

      return {
        ...state,
        teams: state.teams,
        currentTeam: updatedTeam,
        currentCard: Array.from(state.currentDeck)[0],
        currentDeck: state.currentDeck,
        correctCards: new Set<string>(),
        failedCards: new Set<string>(),
        // round: 2,
      };
    }
    case "RESUME_ROUND": {
      const getUpdatedTeam = (currentTeam: string): TeamNames => {
        return currentTeam === TeamNames.EQUIPO_1
          ? TeamNames.EQUIPO_2
          : TeamNames.EQUIPO_1;
      };

      // Uso:
      const updatedTeam = getUpdatedTeam(state.currentTeam);

      return {
        ...state,
        teams: state.teams,
        currentTeam: updatedTeam,
        currentCard: Array.from(state.currentDeck)[0],
        currentDeck: state.currentDeck,
        correctCards: state.correctCards,
        failedCards: state.failedCards,
        // round: 2,
      };
    }

    // Termino la ronda (1,2,3)
    case "END_ROUND": {
      return {
        ...state,
        // currentDeck: resetDeck,
        currentCard: "",
      };
    }

    case "RESET_DECK": {
      return {
        ...state,
        currentDeck: new Set(action.payload),
      };
    }

    case "TOGGLE_CARD": {
      const card = action.payload;
      const newCorrectCards = new Set(state.correctCards);
      const newFailedCards = new Set(state.failedCards);
      const newCurrentDeck = new Set(state.currentDeck);
      let newTeams = [...state.teams];

      if (newCorrectCards.has(card)) {
        // Mover de correctCards a failedCards y restar puntos
        newCorrectCards.delete(card);
        newFailedCards.add(card);
        newTeams = state.teams.map((team) =>
          team.name === state.currentTeam
            ? { ...team, points: team.points - 1 }
            : team,
        );
        saveTeams(newTeams);
        newCurrentDeck.add(card);
      } else if (newFailedCards.has(card)) {
        // Mover de failedCards a correctCards y sumar puntos
        newFailedCards.delete(card);
        newCorrectCards.add(card);
        newTeams = state.teams.map((team) =>
          team.name === state.currentTeam
            ? { ...team, points: team.points + 1 }
            : team,
        );
        saveTeams(newTeams);
        newCurrentDeck.delete(card);
      }

      return {
        ...state,
        correctCards: newCorrectCards,
        failedCards: newFailedCards,
        teams: newTeams,
        currentDeck: newCurrentDeck,
      };
    }
    case "RESET_GAME":
      return getInitialState(action.payload);

    default:
      return state;
  }
};
