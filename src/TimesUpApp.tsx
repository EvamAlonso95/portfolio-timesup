import { useState } from "react";
import { ChooseTeamComponent } from "./components/ChooseTeamComponent";
import { FooterComponent } from "./components/FooterComponent";
import { HeaderComponet } from "./components/HeaderComponent";
import { RulesComponent } from "./components/RulesComponent";
import { GameStatus } from "./data/game.data";
import { GamePanelComponent } from "./components/GamePanelComponent";
import { useGameDeck } from "./hooks/useGameDeck";
import { decks } from "./data/cards.data";


export const TimesUpApp = () => {
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.SELECTION);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const gameCards = useGameDeck(selectedCategories);
    const totalGameCards = decks[0].deck.length

    return (
        <>
            <HeaderComponet />

            <main className="layout__main">
                {gameStatus == GameStatus.SELECTION && (
                    <>
                        <ChooseTeamComponent gameStatus={gameStatus} setGameStatus={setGameStatus} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
                        <RulesComponent lenght={totalGameCards} />
                    </>
                )}
                {gameStatus == GameStatus.ROUND_1 && (
                    // Componente de juego
                    <GamePanelComponent gameCards={gameCards} GameStatus={GameStatus.ROUND_1} />
                )}

            </main>
            <FooterComponent />
        </>

    )
}
