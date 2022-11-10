import React from "react";

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
      <img className="card-front" src={card.src} alt="front of a card"></img>
      <img
        className="card-back"
        src={cardBack}
        alt="back of a card"
        onClick={flipCard}
      ></img>
    </div>
  );
}
