import { GameStatus } from '../../data/game.data'
import { PhaseDisplayComponent } from './PhaseDisplayComponent'


export const StatusBarComponent = ({ GameStatus }: { GameStatus: GameStatus }) => {
    return (
        <>
            <PhaseDisplayComponent gameStatus={GameStatus} />
        </>
    )
}
