import { GameStatus } from '../../data/game.data'
import { useTimer } from '../../hooks/useTimer'
import { PhaseDisplayComponent } from './PhaseDisplayComponent'
import { TimerComponent } from './TimerComponent'

// import { ScoreComponent } from './ScoreComponent'




export const StatusBarComponent = ({ GameStatus }: { GameStatus: GameStatus }) => {

    const { team, timeLeft } = useTimer({ gameStatus: GameStatus });
    return (
        <div className="status-bar-content">
            <PhaseDisplayComponent gameStatus={GameStatus} currentTeam={team} />
            <TimerComponent initialSeconds={timeLeft} />
            {/* <ScoreComponent /> */}
        </div>

    )
}


