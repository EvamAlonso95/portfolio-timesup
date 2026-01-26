import { useReducer } from 'react'
import { GameStatus } from '../data/game.data'
import { CardComponent } from './CardComponent'
import { ButtonsComponent } from './StatusBarComponent/ButtonsComponent'
import { StatusBarComponent } from './StatusBarComponent/StatusBarComponent'
import { getInitialState, timesUpReducer } from '../reducer/timesUpReducer'




export const GamePanelComponent = ({ gameCards, GameStatus }: { gameCards: string[], currentCard: string, GameStatus: GameStatus }) => {

    const [state, dispatch] = useReducer(timesUpReducer, getInitialState(gameCards))
    console.log('Jugamos con:', state.currentDeck)
    console.log('Carta adivinar:', state.currentCard)
    console.log('Estado juego', GameStatus)




    return (
        <>
            {/* Game Tab */}

            <div className="game-panel-container">
                {/* Game Status Bar */}
                {/* FASE y Equipo */}
                <div className="game-status-bar">
                    <StatusBarComponent GameStatus={GameStatus} />
                </div>

                {/* Game Card */}

                <CardComponent currentCard={state.currentCard} GameStatus={GameStatus} />

                {/* COMPONENTE BOTONES */}

                <ButtonsComponent dispatch={dispatch} gameCards={state.currentDeck} />


                {/* Phase Instructions */}
                <div className="phase-instructions">
                    {/* <h4 className="phase-title">Fase {GameStatus.ROUND_1}</h4> */}
                    <p className="phase-description">
                        {GameStatus == 'ROUND_1' && "Describe la carta sin decir su nombre ni palabras derivadas de ella"}
                        {GameStatus == 'ROUND_2' && "Gestos sin hablar"}
                        {GameStatus == 'ROUND_3' && "Una sola palabra por intento"}
                    </p>
                </div>
            </div>

        </>
    )
}
