import { useState } from "react";
import { DeckCategoryComponent } from "./DeckCategoryComponent";
import Swal from "sweetalert2";
import { GameStatus } from "../data/game.data";
import { saveTeams } from "../utils/storage";

interface ChooseTeamComponentProps {
    gameStatus: GameStatus;
    setGameStatus: (status: GameStatus) => void;
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;

}

export const ChooseTeamComponent = ({ setGameStatus, selectedCategories, setSelectedCategories }: ChooseTeamComponentProps) => {
    const onHandleStartGame = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('A jugar')
        if (team1 == '' || team2 == '' || selectedCategories.length == 0) {

            Swal.fire({
                icon: "info",
                title: "Campos vacíos",
                text: "Poned nombre a los equipos y seleccionad al menos una categoría",

            });
            return;
        } else if (team1 == team2) {
            Swal.fire({
                icon: "error",
                title: "Oh no...",
                text: "No podéis elegir el mismo nombre de equipo",

            });
            return;
        }
        //Guardo los nombres de los equipos
        saveTeams([team1, team2]);
        setGameStatus(GameStatus.ROUND_1);
    }

    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');

    // Cuando el usuario haga click en "¡A Jugar!", tienes acceso a selectedCategories


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
                    <DeckCategoryComponent onCategoriesChange={setSelectedCategories} />
                    <button type="submit" className="layout__btns btn" onClick={onHandleStartGame} >¡A Jugar!</button>
                </form>
            </div>
        </>
    )
}
