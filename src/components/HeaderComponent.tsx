import { GameStatus } from "../data/game.data";
import type { TimesUpAction, TimesUpState } from "../reducer/timesUpReducer";
import { removePrevGameStatus, removeTeams } from "../utils/storage";
import back from '../assets/return.png'
import info from '../assets/info.png'

export const HeaderComponet = ({
    state,
    dispatch,
    setGameStatus,
    setSelectedCategories,
    selectedCategories,
    gamestatus

}: {
    state: TimesUpState;
    dispatch: React.Dispatch<TimesUpAction>;
    setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    gamestatus: GameStatus;

}) => {
    const handleRestartGame = () => {
        removePrevGameStatus();
        dispatch({ type: "RESET_GAME", payload: Array.from(state.currentDeck) })
        setGameStatus("SELECTION");
        selectedCategories = []
        setSelectedCategories(selectedCategories)
        removeTeams();
    }

    const showGameRules = () => {
        setGameStatus("RULES")
    }
    return (

        <>
            <header className="layout__header">

                <nav>

                    <div className="layout__title" onClick={handleRestartGame}>

                        <svg className="layout__icon" width="48" height="48" viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                            <g fill="currentColor">
                                <path d="M15.07 1H8.93a1 1 0 0 0 0 2h6.14a1 1 0 1 0 0-2zM12 4a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8zm0 2a6 6 0 1 1-6 6 6.01 6.01 0 0 1 6-6zm.5 3h-1v4l3 1.5.5-.866-2.5-1.25V9z" />
                            </g>
                        </svg>
                        <h1 >Time's Up!</h1>
                    </div>

                    <div className="layout__btns">
                        {gamestatus === GameStatus.RULES && (
                            <button className="btn restart" onClick={handleRestartGame} > <img src={back} alt="" aria-hidden="true" className="rules__icon" loading="lazy" /> Back to the game </button>
                        )}
                        {/* {
                            gamestatus !== GameStatus.SELECTION && gamestatus !== GameStatus.RULES && (

                                <button className="btn restart" onClick={handleRestartGame} > End Game </button>

                            )

                        } */}

                        {gamestatus === GameStatus.SELECTION && (
                            <button className="btn restart" onClick={showGameRules} ><img src={info} alt="" aria-hidden="true" className="rules__icon" loading="lazy" /> How to play </button>
                        )}

                    </div>
                </nav>
            </header>
        </>
    )
}
