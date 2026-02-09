

export const TeamTurnComponent = ({ currentTeam }: { currentTeam: string }) => {
    return (
        <>
            <div>

                <span className="status-label">Turno</span>
                <span className="status-value status-turn">{currentTeam}</span>
            </div>
        </>
    )
}
