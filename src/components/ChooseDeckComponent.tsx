import { GameStatus } from "../data/game.data";


import Swal from "sweetalert2";
import { decks } from "../data/cards.data";
import { saveTeams } from "../utils/storage";

interface ChooseDeckComponentProps {
    gameStatus: GameStatus;
    setGameStatus: (status: GameStatus) => void;
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
}

export const ChooseDeckComponent = ({ setGameStatus, selectedCategories, setSelectedCategories }: ChooseDeckComponentProps) => {

    const onHandleStartGame = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedCategories.length === 0) {
            Swal.fire({
                icon: "info",
                title: "Elige una categoría",
                text: "No habéis seleccionado categoría de juego",
            });
            return;
        }

        // Solo inicializa si no existen

        saveTeams([
            { name: "Equipo 1", points: 0 },
            { name: "Equipo 2", points: 0 }
        ]);

        setGameStatus(GameStatus.ROUND_1);
    }

    const handleCheckboxChange = (deckName: string) => {
        // Usamos el estado existente selectedCategories, no creamos uno nuevo
        let updatedCategories;
        if (selectedCategories.includes(deckName)) {
            updatedCategories = selectedCategories.filter(cat => cat !== deckName);
        } else {
            updatedCategories = [...selectedCategories, deckName];
        }

        setSelectedCategories(updatedCategories); // Actualizamos el estado externo
    }

    return (
        <>
            <div className='main__categories'>
                <h3>¡Formad equipos dos equipos y elegid la categoría!</h3>
                <form onSubmit={onHandleStartGame} className="mb-6">
                    {decks.map(deck => (
                        <label key={deck.name}>
                            {deck.name}
                            <input
                                type='checkbox'
                                value={deck.name}
                                checked={selectedCategories.includes(deck.name)}
                                onChange={() => handleCheckboxChange(deck.name)}
                            />
                        </label>
                    ))}
                    <button type="submit" className="layout__btns btn">¡A Jugar!</button>
                </form>
            </div>
        </>
    );
}