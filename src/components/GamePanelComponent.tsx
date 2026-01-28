import { GameStatus } from '../data/game.data'
import { CardComponent } from './CardComponent'
import { ButtonsComponent } from './StatusBarComponent/ButtonsComponent'
import { StatusBarComponent } from './StatusBarComponent/StatusBarComponent'
import { RoundSummaryComponent } from './RoundSummaryComponent'
import type { TimesUpAction, TimesUpState } from '../reducer/timesUpReducer'


export const GamePanelComponent = ({
    gameCards,
    state,//!
    dispatch,
    gameStatus,
    setGameStatus,
    currentCard, //!
}: {
    gameCards: string[];
    state: TimesUpState;
    dispatch: React.Dispatch<TimesUpAction>;
    gameStatus: GameStatus;
    setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>
    currentCard: string;
}) => {
    console.log('Panel de juego:', state);
    const handleTimeout = () => {
        dispatch({ type: "END_ROUND" });
        setGameStatus(GameStatus.END_ROUND);
    };



    return (
        <div className="game-panel-container">
            <div className="game-status-bar">
                <StatusBarComponent gameStatus={gameStatus} setGameStatus={setGameStatus} onTimeout={handleTimeout} />
            </div>
            {gameStatus === GameStatus.ROUND_1 && (
                <CardComponent currentCard={currentCard} GameStatus={gameStatus} />
            )}
            {gameStatus === GameStatus.END_ROUND && (
                <RoundSummaryComponent correctCards={state.correctCards} failedCards={state.failedCards} />
            )}
            <ButtonsComponent dispatch={dispatch} gameCards={gameCards} />
            <div className="phase-instructions">
                <p className="phase-description">
                    {GameStatus.ROUND_1 && "Describe la carta sin decir su nombre ni palabras derivadas de ella"}
                    {GameStatus.ROUND_2 && "Gestos sin hablar"}
                    {GameStatus.ROUND_3 && "Una sola palabra por intento"}
                </p>
            </div>
        </div>
    )
}