import { GameStatus } from '../../data/game.data'
import { TimerComponent } from './TimerComponent'
import { PhaseDisplayComponent } from './PhaseDisplayComponent'
import { ScoreComponent } from './ScoreComponent'

const initialSeconds = 60


export const StatusBarComponent = ({ GameStatus }: { GameStatus: GameStatus }) => {
    return (
        <div className="status-bar-content">
            <PhaseDisplayComponent gameStatus={GameStatus} />
            <TimerComponent initialSeconds={initialSeconds} />
            <ScoreComponent />
        </div>

    )
}


