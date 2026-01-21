import { CardComponent } from "./components/CardComponent";
import { ChooseTeamComponent } from "./components/ChooseTeamComponent";
import { FooterComponent } from "./components/FooterComponent";
import { HeaderComponet } from "./components/HeaderComponent";
import { RulesComponent } from "./components/RulesComponent";

export const TimesUpApp = () => {
    return (
        <>
            {/* // HEADER */}
            <HeaderComponet />


            <main className="layout__main">
                {/* Depende de la fase de juego se muestra un subtitulo */}
                {/* <ChooseTeamComponent /> */}
                {/* <RulesComponent lenght={89} /> */}
                <CardComponent />

            </main>
            {/* // FOOTER */}
            <FooterComponent />



        </>

    )
}
