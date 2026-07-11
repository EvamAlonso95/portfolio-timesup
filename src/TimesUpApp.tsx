import { useReducer, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ChooseDeckComponent } from "./components/ChooseDeckComponent";
import { FooterComponent } from "./components/FooterComponent";
import { HeaderComponet } from "./components/HeaderComponent";
import { RulesComponent } from "./components/RulesComponent";
import { GameStatus } from "./data/game.data";
import { GamePanelComponent } from "./components/GamePanelComponent";
import { decks } from "./data/cards.data";
import type { CustomDeck } from "./utils/storage";
import { getCustomDecks, getDeckKey } from "./utils/storage";
import { getInitialState, timesUpReducer } from "./reducer/timesUpReducer";
import { GameFinalScore } from "./components/GameFinalScore";


export const TimesUpApp = () => {
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.SELECTION);
    const [selectedDeckKeys, setSelectedDeckKeys] = useState<string[]>([]);
    const [customDecks, setCustomDecks] = useState<CustomDeck[]>(() => getCustomDecks());

    const handleCustomDecksChange = useCallback(() => {
        setCustomDecks(getCustomDecks());
    }, []);

    // Merge built-in + custom decks for card selection
    const allDecks = useMemo(() => [...decks, ...customDecks], [customDecks]);
    const selectedDecks = useMemo(
        () => allDecks.filter(deck => selectedDeckKeys.includes(getDeckKey(deck))),
        [allDecks, selectedDeckKeys]
    );
    const gameCards = useMemo(() => selectedDecks.flatMap(deck => deck.deck), [selectedDecks]);
    const [state, dispatch] = useReducer(timesUpReducer, [], getInitialState)

    const prevGameStatus = useRef<GameStatus>(GameStatus.SELECTION)
    // Reinicializar el reducer cuando se inicia el juego
    useEffect(() => {
        if (prevGameStatus.current === GameStatus.SELECTION && gameStatus === GameStatus.ROUND_1) {
            dispatch({ type: "RESET_GAME", payload: gameCards });
        }
        prevGameStatus.current = gameStatus
    }, [gameStatus, gameCards]);



    return (
        <>

            <HeaderComponet
                setGameStatus={setGameStatus}
                state={state}
                dispatch={dispatch}
                setSelectedDeckKeys={setSelectedDeckKeys}
                selectedDeckKeys={selectedDeckKeys}
                gamestatus={gameStatus} />

            <main className="layout__main">
                {gameStatus == GameStatus.SELECTION && (
                    <>
                        <ChooseDeckComponent
                            gameStatus={gameStatus}
                            setGameStatus={setGameStatus}
                            selectedDeckKeys={selectedDeckKeys}
                            setSelectedDeckKeys={setSelectedDeckKeys}
                            customDecks={customDecks}
                            onCustomDecksChange={handleCustomDecksChange}
                        />

                    </>
                )}
                {gameStatus === GameStatus.RULES && (
                    <RulesComponent />
                )}

                {(gameStatus === GameStatus.ROUND_1 || gameStatus === GameStatus.ROUND_2 || gameStatus === GameStatus.ROUND_3) && (
                    <GamePanelComponent
                        gameCards={gameCards}
                        currentCard={state.currentCard}
                        gameStatus={gameStatus}
                        setGameStatus={setGameStatus}
                        state={state}
                        dispatch={dispatch}
                    />
                )}

                {gameStatus == GameStatus.END_ROUND && (
                    <GamePanelComponent
                        gameCards={gameCards}
                        currentCard={state.currentCard}
                        state={state}
                        dispatch={dispatch}
                        gameStatus={gameStatus}
                        setGameStatus={setGameStatus}
                    />
                )}

                {gameStatus == GameStatus.FINISHED && (
                    <GameFinalScore setGameStatus={setGameStatus}
                        state={state}
                        dispatch={dispatch}
                        setSelectedDeckKeys={setSelectedDeckKeys}
                        selectedDeckKeys={selectedDeckKeys} />
                )}

            </main>
            <FooterComponent />
        </>

    )
}
