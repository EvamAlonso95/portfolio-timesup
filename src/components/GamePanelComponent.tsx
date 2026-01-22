import { GameStatus } from '../data/game.data'
import { CardComponent } from './CardComponent'
import { ButtonsComponent } from './StatusBarComponent/ButtonsComponent'
import { StatusBarComponent } from './StatusBarComponent/StatusBarComponent'



export const GamePanelComponent = ({ gameCards, GameStatus }: { gameCards: string[], GameStatus: GameStatus }) => {
    console.log(gameCards)
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

                <CardComponent gameCards={gameCards} GameStatus={GameStatus} />



                {/* COMPONENTE BOTONES */}

                <ButtonsComponent />


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
