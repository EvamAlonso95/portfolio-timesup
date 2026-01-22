interface ScoreProps {
    teams: string[];
    scores: number[];
}

export const ScoreComponent = ({ teams, scores }: ScoreProps) => {
    return (
        <div className="score-container">
            {teams.map((team, index) => (
                <div key={index} className="score-item">
                    <div className="score-team">{team}</div>
                    <div className="score-points">{scores[index] || 0}</div>
                </div>
            ))}
        </div>
    );
};
