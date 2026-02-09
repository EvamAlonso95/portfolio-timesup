import { GameStatus } from "../../data/game.data"




export const PhaseDisplayComponent = ({ gameStatus }: { gameStatus: GameStatus }) => {

    return (
        <>
            <div className="status-item phase">
                <div>
                    <span className="status-label">Fase actual</span>
                    <span className="status-value status-phase"> {gameStatus == 'ROUND_1' ? 'Fase 1' : gameStatus == 'ROUND_2' ? 'Fase 2' : 'Fase 3'} / 3</span>
                </div>

            </div>
        </>
    )
}
