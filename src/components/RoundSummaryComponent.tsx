export interface RoundSummaryProps {
    correctCards: string[];
    failedCards: string[];
}

export const RoundSummaryComponent = ({ correctCards, failedCards }: RoundSummaryProps) => {
    return (

        <div className="summary-container">
            <h2 className="summary-header">RESUMEN DE LA RONDA</h2>
            <div className="summary-section">
                <h3 className="section-title">✅ CARTAS ACERTADAS</h3>
                <div className="cards-list">
                    {correctCards.map((correctCard, idx) => (
                        <p key={idx}>{correctCard}</p>
                    ))}

                </div>
            </div>
            <div className="summary-section">
                <h3 className="section-title">❌ CARTAS FALLADAS</h3>
                <div className="cards-list">
                    {failedCards.map((failedCard, idx) => (
                        <p key={idx}>{failedCard}</p>
                    ))}

                </div>
            </div>
        </div>
    );
};