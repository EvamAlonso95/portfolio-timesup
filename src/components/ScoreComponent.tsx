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
            <div className="score__header">
                <h1 className="score__title">Resumen de la ronda</h1>
            </div>

            <div className="teams-container">
                <div className="team-card">
                    <div className="team-name team1">{TeamNames.EQUIPO_1}</div>
                    <div className="team-pattern"></div>
                    <div className="team-points points__team1">{team1Points}</div>
                </div>


                <div className="vs-divider">VS</div>


                <div className="team-card">
                    <div className="team-name team2">{TeamNames.EQUIPO_2}</div>
                    <div className="team-pattern"></div>
                    <div className="team-points points__team2">{team2Points}</div>
                </div>
            </div>
            <button className="btn nextPhase" onClick={nextPhase}> Siguiente ronda </button>

            {
                prevGameStatus === GameStatus.ROUND_1 && (

                    <p className="text">Próxima fase: <span className="text__focus">Solo una palabra</span></p>


                )

            }
            {
                prevGameStatus === GameStatus.ROUND_2 && (
                    <p className="text">Próxima fase: <span className="text__focus">Solo mímica</span></p>

                )
            }
        </div>
    )
}
