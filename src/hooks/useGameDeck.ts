// hooks/useGameDeck.ts
import { useMemo } from "react";
import { decks } from "../data/cards.data";

export const useGameDeck = (selectedCategories: string[]) => {
  const filteredCards = useMemo(() => {
    if (selectedCategories.length === 0) return [];

    return selectedCategories.flatMap((category) => {
      const selectedDeck = decks.find((d) => d.name === category);
      return selectedDeck?.deck || [];
    });
  }, [selectedCategories]);

  return filteredCards;
};
