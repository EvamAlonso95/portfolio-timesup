import { GameStatus } from '../data/game.data';

interface GameStatusBarProps {
    teams: string[];
    gameStatus: GameStatus;
}

export const GameStatusBar = ({ teams, gameStatus }: GameStatusBarProps) => {
    return (
        <div className="game-status-bar">
            <div className="status-bar-content">
                {/* FASE y Equipo */}
                <div className="status-item">
                    <div>
                        <span className="status-label">Fase:</span>
                        <span className="status-value status-phase">{gameStatus == 'ROUND_1' ? ' Fase 1' : ''}/3</span>
                    </div>
                    <div>
                        <span className="status-label">Turno:</span>
                        <span className="status-value status-turn">{teams[0]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
