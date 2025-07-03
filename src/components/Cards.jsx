import "./Cards.css"

const Cards = (props) => {


return (
    <>
    <div>
    <h2>{props.selectedBoard.label}</h2>
        <button className="delete-board-button" onClick={props.deleteBoard}>Delete Board</button>
    </div>
    <div className="cards">
    {props.cards.map((card) => {
        return (
            <section className="card">
                <p>{card.message}</p>
                <p>{card.likes_count}💚</p>
                <button onClick={() => props.likeCard(card.card_id)}>💚 Like</button>
                <button onClick={() => props.deleteCard(card.card_id)}>✘ Delete</button>
            </section>
        )
    })}
    </div>
    </>
)
}

export default Cards;