import { Deck, decks } from "../data/cards.data"

export const CardComponent = () => {
    return (
        <>
            <div className="main__card">
                <div className="game-card">
                    <div className="card-front alternative-card">
                        <div className="card-background-pattern"></div>

                        <div className="card-top-section">

                            <div className="card-content">{decks[Math.floor(Math.random() * decks.length)].deck[Math.floor(Math.random() * decks[Math.floor(Math.random() * decks.length)].deck.length)]}</div>
                            <div className="card-arrow"></div>


                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}
