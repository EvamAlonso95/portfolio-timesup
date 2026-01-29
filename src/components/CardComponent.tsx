import { GameStatus } from "../data/game.data"

export const CardComponent = ({ currentCard, gameStatus }: { currentCard: string, gameStatus: GameStatus }) => {

    return (
        <>
            <div className="main__card">
                <div className="game-card">
                    <div className="card-front alternative-card">
                        <div className="card-background-pattern"></div>

                        <div className="card-top-section">

                            <div className="card-content">{currentCard}</div>
                            <div className="card-instructions">
                                {gameStatus === GameStatus.ROUND_1 && "¡Describe con palabras!"}
                                {gameStatus === GameStatus.ROUND_2 && "¡Solo gestos!"}
                                {gameStatus === GameStatus.ROUND_3 && "¡Una sola palabra!"}
                            </div>
                            <div className="card-arrow"></div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
