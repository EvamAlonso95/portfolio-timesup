
interface Props {
    lenght: number
}
export const RulesComponent = ({ lenght }: Props) => {
    return (
        <>
            <div className="main__rules">
                <h3 className="text-xl font-semibold mb-4">Reglas del juego</h3>
                <div className="bg-black bg-opacity-20 rounded-lg p-4 space-y-3">
                    {/* {Importar la longuitud de la data cartas - hacer un tipo o interfaz } */}
                    <p><strong>Total de cartas:</strong>{lenght}</p>
                    <p><strong>Fases:</strong> 3 fases de 60 segundos cada una</p>
                    <p><strong>Objetivo:</strong> Adivinar más cartas que el otro equipo</p>
                    <div className="mt-4 p-3 bg-yellow-500 bg-opacity-20 rounded-lg">
                        <h4 className="font-semibold text-yellow-300">Instrucciones:</h4>
                        <ul className="text-sm space-y-1 mt-2 list-none">
                            <li> Fase 1: Describir con palabras</li>
                            <li> Fase 2: Solo una palabra</li>
                            <li> Fase 3: Solo gestos</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
