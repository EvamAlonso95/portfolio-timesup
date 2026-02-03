import { useState } from "react";
import { GameStatus } from "../data/game.data";
import type { TimesUpAction } from "../reducer/timesUpReducer";
import { ScoreComponent } from "./ScoreComponent";
import { getPrevGameStatus } from "../utils/storage";

export interface RoundSummaryProps {
    actualDeckSize: number;
    correctCards: Set<string>;
    failedCards: Set<string>;
    dispatch: React.Dispatch<TimesUpAction>;
    setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
    gameStatus: GameStatus,
    gameCards: string[]

}
// let isScoreComponentVisible = false;
export const RoundSummaryComponent = ({ actualDeckSize, correctCards, failedCards, dispatch, setGameStatus, gameStatus, gameCards }: RoundSummaryProps) => {



    const [changingRound, setChangingRound] = useState(false)

    const handleToggleCard = (card: string) => {
        dispatch({ type: "TOGGLE_CARD", payload: card })
    }

    const hanldeChangingRound = () => {
        console.log('Cambio de ronda,', gameCards)
        setChangingRound(true)
        dispatch({ type: "RESET_DECK", payload: gameCards })
    }



    console.log('Mazo acutal', actualDeckSize);
    const prevGameStatus = getPrevGameStatus()
    const nextTeamTurn = () => {


        if (actualDeckSize !== 0) {
            dispatch({ type: "NEXT_ROUND" })
            setGameStatus(prevGameStatus)
        }


    }
    return (
        <>
            {gameStatus === GameStatus.END_ROUND && !changingRound && (
                <>
                    <div className="summary-container">
                        <h2 className="summary-header">RESUMEN DE LA RONDA</h2>
                        <div className="summary-section">
                            <h3 className="section-title">✅ CARTAS ACERTADAS</h3>
                            <div className="cards-list">
                                {Array.from(correctCards).map((correctCard) => (
                                    <div className="card-item correct" key={correctCard}>
                                        <p>{correctCard}</p>
                                        <button className="btn cancelar" onClick={() => handleToggleCard(correctCard)}>X</button>

                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className="summary-section">
                            <h3 className="section-title">❌ CARTAS FALLADAS</h3>
                            <div className="cards-list">
                                {Array.from(failedCards).map((failedCard) => (
                                    <div className="card-item failed" key={failedCard}>
                                        <p>{failedCard}</p>
                                        <button className="btn cancelar" onClick={() => handleToggleCard(failedCard)}>X</button>

                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    {
                        actualDeckSize === 0 && (
                            <button className="btn" onClick={hanldeChangingRound} > Cambio ronda</button>

                        )
                    }
                    {
                        actualDeckSize !== 0 && (
                            <button className="btn" onClick={nextTeamTurn}> Continue </button>

                        )
                    }
                </>

            )}
            {console.log('que da', actualDeckSize === 0, gameStatus === GameStatus.END_ROUND, changingRound)}
            {
                changingRound && (
                    <ScoreComponent dispatch={dispatch} setGameStatus={setGameStatus} actualDeckSize={actualDeckSize} />

                )
            }


        </>
    );
};