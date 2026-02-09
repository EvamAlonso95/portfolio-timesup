import { GameStatus } from "../data/game.data";


import Swal from "sweetalert2";
import { decks } from "../data/cards.data";
import play from '../assets/play-button.png'
// import { saveTeams } from "../utils/storage";


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
                text: "Parece que habéis olvidado seleccionar una categoría de juego. Seleccionad vuestro tema favorito para continuar.",
                confirmButtonText: 'OK',
                buttonsStyling: false,
                customClass: {
                    popup: 'popup',
                    title: 'popup__title',
                    htmlContainer: 'popup__text',
                    confirmButton: 'popup__btn',
                    icon: 'popup__icon'
                },

            });
            return;
        }

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
            <>
                <div className="main__categories">
                    <h2 className="main__title">¡Formad equipos dos equipos! </h2>
                    <span className="main__subtitle">Elegid una categoría para empezar la diversión</span>
                    <form onSubmit={onHandleStartGame} className="categories__container">
                        <div className="categories">
                            {decks.map((deck) => (
                                <button
                                    key={deck.name}
                                    type="button"
                                    onClick={() => handleCheckboxChange(deck.name)}
                                    className={`categories__card ${selectedCategories.includes(deck.name) ? "is-selected" : ""
                                        }`}
                                >
                                    <span>{deck.emoji}</span>
                                    <span>{deck.name}</span>

                                </button>
                            ))}
                        </div>

                        <button type="submit" className="layout__btns btn play">
                            <img src={play} alt="" aria-hidden="true" className="rules__icon" loading="lazy" /> ¡A Jugar!
                        </button>
                    </form>
                </div>
            </>
        </>
    );
}