import { useState } from "react";
import { GameStatus } from "../data/game.data";
import Swal from "sweetalert2";
import { decks } from "../data/cards.data";
import type { CustomDeck } from "../utils/storage";
import { deleteCustomDeck, getDeckKey, isCustomDeck } from "../utils/storage";
import { CustomDeckModal } from "./CustomDeckModal";
import play from '../assets/play-button.png'

interface ChooseDeckComponentProps {
    gameStatus: GameStatus;
    setGameStatus: (status: GameStatus) => void;
    selectedDeckKeys: string[];
    setSelectedDeckKeys: React.Dispatch<React.SetStateAction<string[]>>;
    customDecks: CustomDeck[];
    onCustomDecksChange: () => void;
}

export const ChooseDeckComponent = ({
    setGameStatus,
    selectedDeckKeys,
    setSelectedDeckKeys,
    customDecks,
    onCustomDecksChange,
}: ChooseDeckComponentProps) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [editingDeck, setEditingDeck] = useState<CustomDeck | null>(null);

    // Merge built-in + custom decks for display
    const allDecks = [
        ...decks.map(d => ({ ...d, isCustom: false as const })),
        ...customDecks.map(d => ({ ...d, isCustom: true as const })),
    ];

    const onHandleStartGame = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedDeckKeys.length === 0) {
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

    const handleCheckboxChange = (deckKey: string) => {
        let updatedKeys;
        if (selectedDeckKeys.includes(deckKey)) {
            updatedKeys = selectedDeckKeys.filter(k => k !== deckKey);
        } else {
            updatedKeys = [...selectedDeckKeys, deckKey];
        }
        setSelectedDeckKeys(updatedKeys);
    }

    const handleCreateDeck = () => {
        setEditingDeck(null);
        setModalOpen(true);
    }

    const handleEditDeck = (e: React.MouseEvent, deck: CustomDeck) => {
        e.stopPropagation();
        setEditingDeck(deck);
        setModalOpen(true);
    }

    const handleDeleteDeck = (e: React.MouseEvent, deck: CustomDeck) => {
        e.stopPropagation();

        Swal.fire({
            icon: "warning",
            title: "Eliminar baraja",
            text: `¿Estás seguro de que quieres eliminar "${deck.name}"?`,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            buttonsStyling: false,
            customClass: {
                popup: 'popup',
                title: 'popup__title',
                htmlContainer: 'popup__text',
                confirmButton: 'popup__btn popup__btn--danger',
                cancelButton: 'popup__btn popup__btn--cancel',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCustomDeck(deck.id);
                // Limpiar selección si estaba seleccionada
                const deckKey = getDeckKey(deck);
                setSelectedDeckKeys(prev => prev.filter(k => k !== deckKey));
                onCustomDecksChange();
            }
        });
    }

    const handleModalSaved = () => {
        onCustomDecksChange();
    }

    return (
        <>
            <div className="main__categories">
                <h2 className="main__title">¡Formad dos equipos!</h2>
                <span className="main__subtitle">Elegid una categoría para empezar la diversión</span>

                <form onSubmit={onHandleStartGame} className="categories__container">
                    <div className="categories">
                        {allDecks.map((deck) => {
                            const deckKey = getDeckKey(deck);
                            return (
                            <button
                                key={deckKey}
                                type="button"
                                onClick={() => handleCheckboxChange(deckKey)}
                                className={`categories__card ${selectedDeckKeys.includes(deckKey) ? "is-selected" : ""
                                    } ${deck.isCustom ? "categories__card--custom" : ""}`}
                            >
                                <span className="categories__card-emoji">{deck.emoji}</span>
                                <span className="categories__card-name">{deck.name}</span>

                                {deck.isCustom && isCustomDeck(deck) && (
                                    <div className="categories__card-actions">
                                        <button
                                            type="button"
                                            className="categories__card-btn categories__card-btn--edit"
                                            onClick={(e) => handleEditDeck(e, deck)}
                                            title="Editar baraja"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            type="button"
                                            className="categories__card-btn categories__card-btn--delete"
                                            onClick={(e) => handleDeleteDeck(e, deck)}
                                            title="Eliminar baraja"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                )}
                            </button>
                            );
                        })}

                        {/* Botón para crear nueva baraja */}
                        <button
                            type="button"
                            className="categories__card categories__card--new"
                            onClick={handleCreateDeck}
                        >
                            <span className="categories__card-emoji">➕</span>
                            <span className="categories__card-name">Crear baraja</span>
                        </button>
                    </div>

                    <button type="submit" className="layout__btns btn play">
                        <img src={play} alt="" aria-hidden="true" className="rules__icon" loading="lazy" /> ¡A Jugar!
                    </button>
                </form>
            </div>

            <CustomDeckModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSaved={handleModalSaved}
                editDeck={editingDeck}
            />
        </>
    );
}