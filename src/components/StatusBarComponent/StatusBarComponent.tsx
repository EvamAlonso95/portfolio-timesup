import { GameStatus } from '../../data/game.data'
import { useTimer } from '../../hooks/useTimer'
import type { TimesUpState } from '../../reducer/timesUpReducer';
import { PhaseDisplayComponent } from './PhaseDisplayComponent'
import { TimerComponent } from './TimerComponent'

export const StatusBarComponent = ({
    gameStatus,
    onTimeout,
    state,
}: {
    gameStatus: GameStatus;
    setGameStatus: (status: GameStatus) => void;
    onTimeout: () => void;
    state: TimesUpState;
    // dispatch: React.Dispatch<TimesUpAction>;
}) => {
    const { timeLeft } = useTimer({
        gameStatus,
        onTimeout,
    });

    return (
        <div className="status-bar-content">
            <PhaseDisplayComponent gameStatus={gameStatus} currentTeam={state.currentTeam} />
            <TimerComponent seconds={timeLeft} />

        </div>
    );
};
