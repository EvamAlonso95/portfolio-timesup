import { useReducer, useState } from "react";
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
    console.log('Filtrado', gameCards);
    const [state, dispatch] = useReducer(timesUpReducer, getInitialState(gameCards))


    const totalGameCards = decks[0].deck.length

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
                    // Componente de juego
                    <GamePanelComponent key={gameCards.join("-")} gameCards={gameCards}
                        currentCard={gameCards[0]}
                        GameStatus={GameStatus.ROUND_1} />
                )}

            </main>
            <FooterComponent />
        </>

    )
}
