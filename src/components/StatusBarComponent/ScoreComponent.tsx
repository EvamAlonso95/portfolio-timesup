import { useReducer } from "react"
import { getInitialState, timesUpReducer } from "../../reducer/timesUpReducer"

export const ScoreComponent = () => {



    const { teams } = state
    return (
        <div className="flex space-x-4">
            {teams.map((team, index) => (
                <div key={index} className="text-center">
                    <div className="text-sm text-gray-300">{team.name}</div>
                    <div className="text-xl font-bold text-yellow-400">{team.points}</div>
                </div>
            ))}
        </div>
    )
}
