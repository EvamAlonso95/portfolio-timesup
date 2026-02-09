import { GameStatus } from "../data/game.data"

export const CardComponent = ({ currentCard, gameStatus }: { currentCard: string, gameStatus: GameStatus }) => {

    return (
        <>
            <div className="main__card">
                <div className="card__container">
                    <div className="card__game">
                        <div className="card-background-pattern"></div>

                        {/* <div className="card-top-section"> */}

                        <div className="card-content">{currentCard}

                            <div className="card-instructions">
                                {gameStatus === GameStatus.ROUND_1 && "¡Describe con palabras!"}
                                {gameStatus === GameStatus.ROUND_2 && "¡Una sola palabra!"}
                                {gameStatus === GameStatus.ROUND_3 && "¡Solo gestos!"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}
