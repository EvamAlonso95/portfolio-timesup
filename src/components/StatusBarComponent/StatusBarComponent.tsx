import { GameStatus } from '../../data/game.data'
import { TimerComponent } from './TimerComponent'
import { PhaseDisplayComponent } from './PhaseDisplayComponent'
import type { TimesUpState } from '../../reducer/timesUpReducer'
// import { ScoreComponent } from './ScoreComponent'

const initialSeconds = 60


export const StatusBarComponent = ({ GameStatus, currentTeam }: { GameStatus: GameStatus, currentTeam: string }) => {
    return (
        <div className="status-bar-content">
            <PhaseDisplayComponent gameStatus={GameStatus} currentTeam={currentTeam} />
            <TimerComponent initialSeconds={initialSeconds} />
            {/* <ScoreComponent /> */}
        </div>

    )
}


