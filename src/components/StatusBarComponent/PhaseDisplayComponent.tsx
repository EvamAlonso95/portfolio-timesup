import { GameStatus } from "../../data/game.data"

import { TeamTurnComponent } from "./TeamTurnComponent"


export const PhaseDisplayComponent = ({ gameStatus, currentTeam }: { gameStatus: GameStatus, currentTeam: string }) => {

    return (
        <>
            <div className="status-item">
                <div>
                    <span className="status-label">Fase actual</span>
                    <span className="status-value status-phase"> {gameStatus == 'ROUND_1' ? 'Fase 1' : gameStatus == 'ROUND_2' ? 'Fase 2' : 'Fase 3'} / 3</span>
                </div>
                <div className="divider"></div>
                {/* Componente turno */}
                <TeamTurnComponent currentTeam={currentTeam} />
            </div>
        </>
    )
}
