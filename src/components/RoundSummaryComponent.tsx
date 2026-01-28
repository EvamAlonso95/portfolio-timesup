import type { TimesUpAction } from "../reducer/timesUpReducer";

export interface RoundSummaryProps {
    correctCards: string[];
    failedCards: string[];
    dispatch: React.Dispatch<TimesUpAction>
}


export const RoundSummaryComponent = ({ correctCards, failedCards, dispatch }: RoundSummaryProps) => {
    const handleToggleCard = (card: string) => {
        dispatch({ type: "TOGGLE_CARD", payload: card })
    }
    return (
        <>

            <div className="summary-container">
                <h2 className="summary-header">RESUMEN DE LA RONDA</h2>
                <div className="summary-section">
                    <h3 className="section-title">✅ CARTAS ACERTADAS</h3>
                    <div className="cards-list">
                        {correctCards.map((correctCard, idx) => (
                            <div className="card-item correct">
                                <p key={idx}>{correctCard}</p>
                                <button className="btn cancelar" onClick={() => handleToggleCard(correctCard)}>X</button>

                            </div>
                        ))}

                    </div>
                </div>
                <div className="summary-section">
                    <h3 className="section-title">❌ CARTAS FALLADAS</h3>
                    <div className="cards-list">
                        {failedCards.map((failedCard, idx) => (
                            <div className="card-item failed">
                                <p key={idx}>{failedCard}</p>
                                <button className="btn cancelar" onClick={() => handleToggleCard(failedCard)}>X</button>

                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <button className="btn"  > Continue </button>
        </>
    );
};