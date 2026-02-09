import type { TimesUpAction } from "../../reducer/timesUpReducer"
import correct from "../../assets/check-mark.png"
import wrong from "../../assets/error.png"

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
                <img src={correct} alt="" aria-hidden="true" className="rules__icon" loading="lazy" />Correcto
            </button>
            <button
                onClick={() => dispatch({
                    type: 'INCORRECT_GUESS',
                    payload: gameCards
                })}
                className="btn-game btn-incorrect"
            >
                <img src={wrong} alt="" aria-hidden="true" className="rules__icon" loading="lazy" /> Incorrecto
            </button>

        </div>
    )
}
