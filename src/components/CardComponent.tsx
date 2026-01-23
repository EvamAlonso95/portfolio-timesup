import { GameStatus } from "../data/game.data"

export const CardComponent = ({ currentCard, GameStatus }: { currentCard: string, GameStatus: GameStatus }) => {
    // const [currentCardIndex, setCurrentCardIndex] = useState(0)

    // const getCurrentCard = () => {
    //     if (gameCards.length === 0) return "Selecciona una categoría"
    //     return gameCards[currentCardIndex]
    // }

    return (
        <>
            <div className="main__card">
                <div className="game-card">
                    <div className="card-front alternative-card">
                        <div className="card-background-pattern"></div>

                        <div className="card-top-section">

                            <div className="card-content">{currentCard}</div>
                            <div className="card-instructions">
                                {GameStatus == 'ROUND_1' && "¡Describe con palabras!"}
                                {GameStatus == 'ROUND_2' && "¡Solo gestos!"}
                                {GameStatus == 'ROUND_3' && "¡Una sola palabra!"}
                            </div>
                            <div className="card-arrow"></div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
