import { useReducer, useState, useEffect } from "react";
import { ChooseDeckComponent } from "./components/ChooseDeckComponent";
import { FooterComponent } from "./components/FooterComponent";
import { HeaderComponet } from "./components/HeaderComponent";
import { RulesComponent } from "./components/RulesComponent";
import { GameStatus } from "./data/game.data";
import { GamePanelComponent } from "./components/GamePanelComponent";
import { decks } from "./data/cards.data";
import { getInitialState, timesUpReducer } from "./reducer/timesUpReducer";


export const TimesUpApp = () => {
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.SELECTION);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const selectedDecks = decks.filter(deck => selectedCategories.includes(deck.name));
    const gameCards = selectedDecks.flatMap(deck => deck.deck);
    const [state, dispatch] = useReducer(timesUpReducer, [], getInitialState)

    // Reinicializar el reducer cuando se inicia el juego
    useEffect(() => {
        if (gameStatus === GameStatus.ROUND_1 && gameCards.length > 0) {
            dispatch({ type: "RESET_GAME", payload: gameCards });
        }
    }, [gameStatus, gameCards.length]);

    const totalGameCards = decks[0].deck.length;



    return (
        <>

            <HeaderComponet />

            <main className="layout__main">
                {gameStatus == GameStatus.SELECTION && (
                    <>
                        <ChooseDeckComponent gameStatus={gameStatus} setGameStatus={setGameStatus} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                        <RulesComponent lenght={totalGameCards} />
                    </>
                )}
                {gameStatus == GameStatus.ROUND_1 && (
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

                {/* {gameStatus == GameStatus.END_ROUND && (
                    <GamePanelComponent
                        key={gameCards.join("-")}
                        gameCards={gameCards}
                        currentCard={state.currentCard}
                        state={state}
                        dispatch={dispatch}
                        gameStatus={gameStatus}
                        setGameStatus={setGameStatus}
                    />
                )} */}

            </main>
            <FooterComponent />
        </>

    )
}
