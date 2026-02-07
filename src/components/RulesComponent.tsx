

import openBook from '../assets/open-book.png';
import usersSilhouette from '../assets/multiple-users-silhouette.png';
import trophy from '../assets/trophy.png';
import numberOne from '../assets/number-one.png';
import numberTwo from '../assets/two.png';
import numbnerThree from '../assets/number-3.png'
import info from '../assets/info.png'


export const RulesComponent = () => {
    return (
        <>
            <div className="main__rules">

                <h3 className="main__title rules">
                    <img src={openBook} alt="" aria-hidden="true" className="rules__icon" loading="lazy" />
                    Reglas del juego
                </h3>
                <div className="main__directions">
                    <div className="preparation">
                        <h4 className="main__title subtitle"> <img src={usersSilhouette} alt="" aria-hidden="true" className="rules__icon" loading="lazy" />Preparación</h4>
                        <p className="rules__text"> Divide a los jugadores en 2 equipos. Elegid la categoría del mazo de cartas con el que jugareis. <span className="fast-rules__bolder">Cada mazo tiene 40 cartas.</span></p>
                    </div>
                    <div className="objetive">
                        <h4 className="main__title subtitle">
                            <img src={trophy} alt="" aria-hidden="true" className="rules__icon" loading="lazy" />
                            Objetivo
                        </h4>
                        <p className="rules__text"> Que tu equipo adivine más cartas que el equipo contrario tras 3 rondas.</p>
                    </div>
                </div>
                <h4 className="main__title subtitle">Las 3 Rondas:</h4>
                <div className="main__rounds">
                    <div className="round__card">
                        <img src={numberOne} alt="" aria-hidden="true" className="rules__icon" loading="lazy" />
                        <h4 className="main__title subtitle">Descripción Libre</h4>
                        <p className="main__subtitle"> Puedes decir lo que quieras sin decir la palabra o palabras derivadas de ella</p>
                    </div>
                    <div className="round__card">
                        <img src={numberTwo} alt="" aria-hidden="true" className="rules__icon" loading="lazy" />
                        <h4 className="main__title subtitle">Una sola palabra</h4>
                        <p className="main__subtitle"> Solo una palabra como pista</p>
                    </div>
                    <div className="round__card">
                        <img src={numbnerThree} alt="" aria-hidden="true" className="rules__icon" loading="lazy" />
                        <h4 className="main__title subtitle">Mímica</h4>
                        <p className="main__subtitle"> ¡Prohibido hablar! Solo gestos y sonidos</p>
                    </div>

                </div>
                <div className="main__fast-rules">
                    <h3 className="main__title subtitle"><img src={info} alt="" aria-hidden="true" className="rules__icon" loading="lazy" />Instrucciones rápidas</h3>
                    <ul>
                        <li><span className="fast-rules__bolder">Turnos:</span> 30 segundos por equipo para adivinar tantas cartas como sea posible. </li>
                        <li><span className="fast-rules__bolder">Pasar:</span> Se puede pasar una carta, que volverá al final del mazo para ese turno.</li>
                        <li><span className="fast-rules__bolder">Puntuación:</span> Cada acierto suma 1 punto. Gana el equipo con más puntos tras la Ronda 3.</li>
                    </ul>
                </div>
            </div>

        </>
    )
}
