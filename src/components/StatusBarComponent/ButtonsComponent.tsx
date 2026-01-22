import { useReducer } from "react"
import { getInitialState, timesUpReducer } from "../../reducer/timesUpReducer"


export const ButtonsComponent = () => {
    const [state, dispatch] = useReducer(timesUpReducer, getInitialState())

    const { teams } = state

    console.log(teams[0].points)




    return (
        <div className="game-buttons">
            <button
                onClick={() => dispatch({
                    type: 'CORRECT_GUESS',
                    payload: ''
                })}
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
    )
}
