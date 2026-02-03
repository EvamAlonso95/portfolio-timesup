

import type { GameStatus } from '../data/game.data';
import { TeamNames } from '../data/teamNames.data'
import type { TimesUpAction, TimesUpState } from '../reducer/timesUpReducer';
import { getTeams, removePrevGameStatus, removeTeams } from '../utils/storage';
import confetti from 'canvas-confetti';
// import confetti from 'canvas-confetti';

export const GameFinalScore = ({
    state,
    dispatch,
    setGameStatus,
    setSelectedCategories,
    selectedCategories

}: {
    state: TimesUpState;
    dispatch: React.Dispatch<TimesUpAction>;
    setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;

}) => {
    const teams = getTeams()
    const team1Points = teams[0].points;
    const team2Points = teams[1].points


    const isTeam1Winner = team1Points > team2Points;
    const isTeam2Winner = team2Points > team1Points;
    const isTie = team1Points === team2Points;


    const handleRestartGame = () => {
        removePrevGameStatus();
        dispatch({ type: "RESET_GAME", payload: Array.from(state.currentDeck) })
        setGameStatus("SELECTION");
        selectedCategories = []
        setSelectedCategories(selectedCategories)
        removeTeams();
    }

    confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
    })
    return (
        <div className="score-container">
            <h1 className="score-header">PUNTUACIONES FINALES</h1>

            <div className="teams-container">
                <div
                    className={`team-card ${isTeam1Winner ? 'winner' : isTie ? 'tie' : 'loser'}`}
                    aria-label={isTeam1Winner ? 'Ganador' : isTie ? 'Empate' : 'Perdedor'}
                >
                    <div className="team-pattern"></div>
                    <div className="team-name">{TeamNames.EQUIPO_1}</div>
                    <div className="team-points">{team1Points}</div>
                </div>

                <div className="vs-divider">VS</div>

                <div
                    className={`team-card ${isTeam2Winner ? 'winner' : isTie ? 'tie' : 'loser'}`}
                    aria-label={isTeam2Winner ? 'Ganador' : isTie ? 'Empate' : 'Perdedor'}
                >
                    <div className="team-pattern"></div>
                    <div className="team-name">{TeamNames.EQUIPO_2}</div>
                    <div className="team-points">{team2Points}</div>
                </div>
            </div>
            <button className="btn restart" onClick={handleRestartGame} > RESTART</button>
        </div>

    )
}
