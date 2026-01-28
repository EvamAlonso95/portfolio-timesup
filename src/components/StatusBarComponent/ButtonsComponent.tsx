import type { TimesUpAction } from "../../reducer/timesUpReducer"

export const ButtonsComponent = ({
    gameCards,
    dispatch

}: {
    gameCards: string[],
    dispatch: React.Dispatch<TimesUpAction>,

}) => {

    return (
        <div className="game-buttons">
            <button
                onClick={() => dispatch({
                    type: 'CORRECT_GUESS',
                    payload: gameCards
                })}
                className="btn-game btn-correct"
            >
                ✅ Correcto
            </button>
            <button
                onClick={() => dispatch({
                    type: 'INCORRECT_GUESS',
                    payload: gameCards
                })}
                className="btn-game btn-incorrect"
            >
                ❌ Incorrecto
            </button>

        </div>
    )
}
