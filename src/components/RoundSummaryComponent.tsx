import type { GameStatus } from "../data/game.data";
import type { TimesUpAction } from "../reducer/timesUpReducer";
import { ScoreComponent } from "./ScoreComponent";

export interface RoundSummaryProps {
    actualDeckSize: number;
    correctCards: Set<string>;
    failedCards: Set<string>;
    dispatch: React.Dispatch<TimesUpAction>;
    setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;


}

export const RoundSummaryComponent = ({ actualDeckSize, correctCards, failedCards, dispatch, setGameStatus }: RoundSummaryProps) => {

    const handleToggleCard = (card: string) => {
        dispatch({ type: "TOGGLE_CARD", payload: card })
    }

    console.log('Mazo acutal', actualDeckSize);
    const nextTeamTurn = () => {


        if (actualDeckSize !== 0) {
            dispatch({ type: "NEXT_ROUND" })
            setGameStatus("ROUND_1")
        }

        // Aqui hay que validar si hay mas cartas o no
        if (actualDeckSize === 0) {
            setGameStatus("ROUND_2")
        }

    }
    return (
        <>
            {actualDeckSize !== 0 && (
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
                    <button className="btn" onClick={nextTeamTurn}> Continue </button>
                </>

            )}

            {
                actualDeckSize === 0 && (
                    <ScoreComponent />

                )
            }


        </>
    );
};