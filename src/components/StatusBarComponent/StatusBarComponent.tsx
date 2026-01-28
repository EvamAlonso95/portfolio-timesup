import { GameStatus } from '../../data/game.data'
import { useTimer } from '../../hooks/useTimer'
import { PhaseDisplayComponent } from './PhaseDisplayComponent'
import { TimerComponent } from './TimerComponent'

export const StatusBarComponent = ({
    gameStatus,
    setGameStatus,
    onTimeout,
}: {
    gameStatus: GameStatus;
    setGameStatus: (status: GameStatus) => void;
    onTimeout: () => void;
}) => {
    const { timeLeft, team } = useTimer({
        gameStatus, // ✅ valor actual
        onTimeout,
    });

    return (
        <div className="status-bar-content">
            <PhaseDisplayComponent gameStatus={gameStatus} currentTeam={team} />
            <TimerComponent seconds={timeLeft} />
            {/* <ScoreComponent /> */}
        </div>
    );
};
