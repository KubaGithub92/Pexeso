import React from "react";
import "./Card.scss";

export default function Card({
  card,
  cardBack,
  flipped,
  inactive,
  cardClicked,
}) {
  // managing clicking card
  const handleClick = () => {
    // if card is not inactive, then run the function
    if (!inactive) cardClicked(card);
  };

  return (
    <div className={flipped ? "card flipped" : "card"} onClick={handleClick}>
      <img className="card__front" src={card.src} alt="front of a card"></img>
      <div className="card__back">
        <img
          className="card__back-img"
          src={cardBack}
          alt="back of a card"
        ></img>
      </div>
    </div>
  );
}
