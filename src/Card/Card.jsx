import React from "react";
import "./Card.scss";

export default function Card({
  card,
  cardBack,
  setCardFlippedOne,
  setCardFlippedTwo,
  cardFlippedOne,
  cardFlippedTwo,
}) {
  const flipCard = () => {
    if (cardFlippedOne) {
      return setCardFlippedTwo(card);
    } else {
      return setCardFlippedOne(card);
    }
  };

  return (
    <div className="card">
      <img className="card__front" src={card.src} alt="front of a card"></img>
      <img
        className="card__back"
        src={cardBack}
        alt="back of a card"
        onClick={flipCard}
      ></img>
    </div>
  );
}
