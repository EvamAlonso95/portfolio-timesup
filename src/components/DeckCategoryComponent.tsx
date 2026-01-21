import { useState } from 'react';
import { decks } from '../data/cards.data';

interface DeckCategoryProps {
    onCategoriesChange: (categories: string[]) => void;
}

export const DeckCategoryComponent = ({ onCategoriesChange }: DeckCategoryProps) => {
    const [categories, setCategories] = useState<string[]>([])

    const handleCheckboxChange = (deckName: string) => {
        let updatedCategories;
        if (categories.includes(deckName)) {
            updatedCategories = categories.filter(cat => cat !== deckName);
        } else {
            updatedCategories = [...categories, deckName];
        }
        setCategories(updatedCategories);
        onCategoriesChange(updatedCategories);  // Pasar al padre
    }

    return (
        <>
            <h3>Elegid la categoría</h3>
            {
                decks.map(deck => (
                    <label key={deck.name}>
                        {deck.name}
                        <input
                            type='checkbox'
                            value={deck.name}
                            checked={categories.includes(deck.name)}
                            onChange={() => handleCheckboxChange(deck.name)}
                        />
                    </label>
                ))
            }
        </>
    )
}
