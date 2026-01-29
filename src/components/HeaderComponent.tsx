import type { GameStatus } from "../data/game.data";
import type { TimesUpAction, TimesUpState } from "../reducer/timesUpReducer";
import { getTeams, removeTeams } from "../utils/storage";



export const HeaderComponet = ({
    state,
    dispatch,
    setGameStatus,
    setSelectedCategories,
    selectedCategories

}: {
    state: TimesUpState;
    dispatch: React.Dispatch<TimesUpAction>;
    setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;

}) => {
    const handleRestartGame = () => {
        dispatch({ type: "RESET_GAME", payload: state.currentDeck })
        setGameStatus("SELECTION");
        selectedCategories = []
        setSelectedCategories(selectedCategories)
        removeTeams();
    }
    return (

        <>
            <header className="layout__header">
                <h1>Time's Up!</h1>

                {/* Visibles durante la partida */}
                <div className="layout__btns">


                    <button className="btn restart" onClick={handleRestartGame} > RESTART</button>
                </div>
            </header>
        </>
    )
}
