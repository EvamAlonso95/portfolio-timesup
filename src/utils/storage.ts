// utils/storage.ts

// === Custom Decks (localStorage, persiste entre sesiones) ===

export interface CustomDeck {
  id: string;
  name: string;
  emoji: string;
  deck: string[];
}

const CUSTOM_DECKS_KEY = "timesup_custom_decks";

export function isCustomDeck(deck: unknown): deck is CustomDeck {
  if (typeof deck !== "object" || deck === null) return false;
  const d = deck as CustomDeck;
  return (
    typeof d.id === "string" &&
    typeof d.name === "string" &&
    typeof d.emoji === "string" &&
    Array.isArray(d.deck)
  );
}

export function getDeckKey(deck: { name: string; id?: string }): string {
  return deck.id ? `custom-${deck.id}` : `builtin-${deck.name}`;
}

export const getCustomDecks = (): CustomDeck[] => {
  try {
    const data = localStorage.getItem(CUSTOM_DECKS_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item: unknown): item is CustomDeck => {
      const valid =
        typeof item === "object" && item !== null &&
        typeof (item as CustomDeck).id === "string" &&
        typeof (item as CustomDeck).name === "string" &&
        Array.isArray((item as CustomDeck).deck) &&
        (item as CustomDeck).deck.every((c: unknown) => typeof c === "string");
      if (!valid) {
        console.warn("CustomDeck: invalid entry filtered out", item);
      }
      return valid;
    });
  } catch {
    return [];
  }
};

export const saveCustomDeck = (deck: CustomDeck): void => {
  const decks = getCustomDecks();
  const index = decks.findIndex(d => d.id === deck.id);
  if (index >= 0) {
    decks[index] = deck;
  } else {
    decks.push(deck);
  }
  try {
    localStorage.setItem(CUSTOM_DECKS_KEY, JSON.stringify(decks));
  } catch (e) {
    console.error("Error saving custom decks to localStorage", e);
  }
};

export const deleteCustomDeck = (id: string): void => {
  const decks = getCustomDecks().filter(d => d.id !== id);
  try {
    localStorage.setItem(CUSTOM_DECKS_KEY, JSON.stringify(decks));
  } catch (e) {
    console.error("Error deleting custom deck from localStorage", e);
  }
};

// === Teams (sessionStorage) ===

export const saveTeams = (teams: { name: string; points: number }[]) => {
  try {
    sessionStorage.setItem("teams", JSON.stringify(teams));
  } catch (e) {
    console.error("Error saving teams to sessionStorage", e);
  }
};

export const getTeams = (): { name: string; points: number }[] => {
  try {
    const data = sessionStorage.getItem("teams");
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item: unknown): item is { name: string; points: number } =>
        typeof item === "object" && item !== null &&
        typeof (item as { name: string; points: number }).name === "string" &&
        typeof (item as { name: string; points: number }).points === "number"
    );
  } catch {
    return [];
  }
};

export const removeTeams = () => {
  sessionStorage.removeItem("teams");
};

export const savePrevGameStatus = (prevGameStatus: string) => {
  try {
    sessionStorage.setItem("prevGameStatus", JSON.stringify(prevGameStatus));
  } catch (e) {
    console.error("Error saving prevGameStatus to sessionStorage", e);
  }
};

export const getPrevGameStatus = () => {
  try {
    const prevGameStatus = sessionStorage.getItem("prevGameStatus");
    return prevGameStatus ? JSON.parse(prevGameStatus) : "";
  } catch {
    return "";
  }
};

export const removePrevGameStatus = () => {
  sessionStorage.removeItem("prevGameStatus");
};
