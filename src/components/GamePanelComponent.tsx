import { GameStatus } from '../data/game.data'
import { CardComponent } from './CardComponent'
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
                <StatusBarComponent GameStatus={GameStatus} />
                <div className="game-status-bar">
                    <div className="status-bar-content">


                        {/* TIMER COMPONENT */}
                        {/* <div className="text-center">
                            <div className={`text-3xl font-mono font-bold ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
                                {formatTime(timeLeft)}
                            </div>
                            <button
                                onClick={toggleTimer}
                                className={`mt-1 px-4 py-1 rounded-full text-sm ${isTimerRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} transition-colors`}
                            >
                                {isTimerRunning ? 'Pausar' : 'Iniciar'}
                            </button>
                        </div> */}

                        {/* SCORE COMPONENT */}

                        {/* <div className="flex space-x-4">
                            {teams.map((team, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-sm text-gray-300">{team}</div>
                                    <div className="text-xl font-bold text-yellow-400">{score[index]}</div>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>

                {/* Game Card */}

                <CardComponent gameCards={gameCards} GameStatus={GameStatus} />

                {/* <div className="flex justify-center">
                    <div className="relative w-full max-w-md h-64 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer transform hover:scale-105 transition-transform">
                        {currentCard ? (
                            <div className="text-center px-6">
                                <div className="text-2xl md:text-3xl font-bold text-gray-900 break-words leading-tight">
                                    {currentCard}
                                </div>
                                <div className="mt-4 text-sm text-gray-700">
                                    {currentPhase === 1 && "¡Describe con palabras!"}
                                    {currentPhase === 2 && "¡Solo gestos!"}
                                    {currentPhase === 3 && "¡Una sola palabra!"}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="text-xl text-gray-800">Cargando carta...</div>
                            </div>
                        )}
                    </div>
                </div> */}

                {/* COMPONENTE BOTONES */}
                <div className="game-buttons">
                    <button
                        // onClick={handleCorrectGuess}
                        className="btn-game btn-correct"
                    >
                        ✅ Correcto
                    </button>
                    <button
                        // onClick={handleIncorrectGuess}
                        className="btn-game btn-incorrect"
                    >
                        ❌ Incorrecto
                    </button>
                    <button
                        // onClick={drawNewCard}
                        className="btn-game btn-change-card"
                    >
                        🔄 Cambiar Carta
                    </button>
                </div>

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
