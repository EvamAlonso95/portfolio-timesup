import { GameStatus } from "../data/game.data";
import { TeamNames } from "../data/teamNames.data"
import type { TimesUpAction } from "../reducer/timesUpReducer";
import { getPrevGameStatus, getTeams } from "../utils/storage"

export interface ScoreComponentProps {
    dispatch: React.Dispatch<TimesUpAction>;
    setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
    actualDeckSize: number;
}

export const ScoreComponent = ({ dispatch, setGameStatus, actualDeckSize }: ScoreComponentProps) => {
    const teams = getTeams()
    const team1Points = teams[0].points;
    const team2Points = teams[1].points;

    const prevGameStatus = getPrevGameStatus()

    console.log('DECK', actualDeckSize)
    const nextPhase = () => {


        dispatch({ type: "NEXT_ROUND" })
        if (prevGameStatus === GameStatus.ROUND_1) {
            setGameStatus("ROUND_2")
        } else if (prevGameStatus === GameStatus.ROUND_2) {
            setGameStatus("ROUND_3")
        } else if (prevGameStatus === GameStatus.ROUND_3) {
            setGameStatus("FINISHED")
            console.log('hola')

        }
    }

    return (
        <div className="score-container">
            <h1 className="score-header">PUNTUACIONES</h1>

            <div className="teams-container">

                <div className="team-card">
                    <div className="team-pattern"></div>
                    <div className="team-name">{TeamNames.EQUIPO_1}</div>
                    <div className="team-points">{team1Points}</div>
                </div>


                <div className="vs-divider">VS</div>


                <div className="team-card team-winner">
                    <div className="team-pattern"></div>
                    <div className="team-name">{TeamNames.EQUIPO_2}</div>
                    <div className="team-points">{team2Points}</div>
                </div>
            </div>
            <button className="btn" onClick={nextPhase}> Siguiente ronda </button>
            {
                prevGameStatus === GameStatus.ROUND_1 && (
                    <p>Solo una palabra</p>

                )

            }
            {
                prevGameStatus === GameStatus.ROUND_2 && (
                    <p>Solo mímica</p>

                )
            }
        </div>
    )
}
