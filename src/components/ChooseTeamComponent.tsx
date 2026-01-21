import { useState } from "react";
import { DeckCategoryComponent } from "./DeckCategoryComponent";

export const ChooseTeamComponent = () => {
    const onHandleStartGame = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(team1)


    }
    const [team1, setTeam1,] = useState('');
    const [team2, setTeam2] = useState('');
    return (
        <>
            <div className='main__teams'>
                <h3>Formad equipos</h3>
                <form onSubmit={onHandleStartGame} className="mb-6">
                    <p>Equipo 1</p>
                    <input id="team1" type="text" placeholder='Nombre equipo 1' value={team1} onChange={(e) =>
                        setTeam1(e.target.value.toUpperCase())
                    }
                        maxLength={12} />
                    <p>Equipo 2</p>
                    <input id="team2" type="text" placeholder='Nombre equipo 2' value={team2} onChange={(e) =>
                        setTeam2(e.target.value.toUpperCase())
                    }
                        maxLength={12} />
                    <DeckCategoryComponent onCategoriesChange={() => {}} />
                    <button type="submit" className="layout__btns btn" onClick={onHandleStartGame} >¡A Jugar!</button>
                </form>
            </div>
        </>
    )
}
