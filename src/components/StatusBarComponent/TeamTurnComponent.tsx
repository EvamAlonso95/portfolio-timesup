import { getTeams } from '../../utils/storage'

const teams = getTeams()

export const TeamTurnComponent = () => {
    return (
        <>
            <div>
                <span className="status-label">Turno:</span>
                <span className="status-value status-turn">{teams[0]}</span>
            </div>
        </>
    )
}
