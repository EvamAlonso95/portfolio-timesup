import { GameStatus } from '../data/game.data'
import { CardComponent } from './CardComponent'
import { ButtonsComponent } from './StatusBarComponent/ButtonsComponent'
import { StatusBarComponent } from './StatusBarComponent/StatusBarComponent'
import { RoundSummaryComponent } from './RoundSummaryComponent'
import type { TimesUpAction, TimesUpState } from '../reducer/timesUpReducer'

import { useGameStatusManager } from '../hooks/useGameStatusManager'
import { savePrevGameStatus } from '../utils/storage'
// import { useEffect } from 'react'


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


    const handleTimeout = () => {
        savePrevGameStatus(gameStatus);

        dispatch({ type: "RESUME_ROUND" });
        setGameStatus(GameStatus.END_ROUND);
    };

    useGameStatusManager(state, gameStatus, setGameStatus, gameCards, dispatch)



    const actualDeckSize = state.currentDeck.size;



    return (
        <div className="game-panel-container">
            {gameStatus !== GameStatus.END_ROUND && (
                <div className="game-status-bar">
                    <StatusBarComponent gameStatus={gameStatus} setGameStatus={setGameStatus} onTimeout={handleTimeout} state={state} />
                </div>
            )}
            {(gameStatus === GameStatus.ROUND_1 || gameStatus === GameStatus.ROUND_2 || gameStatus === GameStatus.ROUND_3) && (
                <>
                    <CardComponent currentCard={currentCard} gameStatus={gameStatus} />
                    <ButtonsComponent dispatch={dispatch} gameCards={gameCards} />

                </>
            )}
            {gameStatus === GameStatus.END_ROUND && (
                <RoundSummaryComponent actualDeckSize={actualDeckSize} correctCards={state.correctCards} failedCards={state.failedCards} dispatch={dispatch} setGameStatus={setGameStatus} gameStatus={gameStatus} gameCards={gameCards} />
            )}

            {/* //! Esto puede sobrar 
             */}
            {/* {
                gameStatus != GameStatus.END_ROUND && (
                    <div className="phase-instructions">
                        <p className="phase-description">
                            {gameStatus === GameStatus.ROUND_1 && "Describe la carta sin decir su nombre ni palabras derivadas de ella"}
                            {gameStatus === GameStatus.ROUND_2 && "Gestos sin hablar"}
                            {gameStatus === GameStatus.ROUND_3 && "Una sola palabra por intento"}
                        </p>
                    </div>

                )
            } */}


        </div>
    )
}