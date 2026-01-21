
const handleStopGame = () => {
    console.log('Parar juego')
}

const handleRestartGame = () => {
    console.log('Reiniciar juego')
}

export const HeaderComponet = () => {
    return (
        <>
            <header className="layout__header">
                <h1>Time's Up!</h1>

                {/* Visibles durante la partida */}
                <div className="layout__btns">
                    <button className="btn stop" onClick={handleStopGame} > STOP </button>

                    <button className="btn restart" onClick={handleRestartGame} > RESTART</button>
                </div>
            </header>
        </>
    )
}
