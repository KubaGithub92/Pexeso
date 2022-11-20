import React, { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import { v4 as uuidv4 } from "uuid";
import { Link, useParams } from "react-router-dom";

const images = {
  pawPatrol: [
    { src: "/img/collections/paw_patrol/1.png", pair: false },
    { src: "/img/collections/paw_patrol/2.png", pair: false },
    { src: "/img/collections/paw_patrol/3.png", pair: false },
    { src: "/img/collections/paw_patrol/4.png", pair: false },
    { src: "/img/collections/paw_patrol/5.png", pair: false },
    { src: "/img/collections/paw_patrol/6.png", pair: false },
    { src: "/img/collections/paw_patrol/7.png", pair: false },
  ],

  frozen: [
    { src: "/img/collections/frozen/1.png", pair: false },
    { src: "/img/collections/frozen/2.png", pair: false },
    { src: "/img/collections/frozen/3.png", pair: false },
    { src: "/img/collections/frozen/4.png", pair: false },
    { src: "/img/collections/frozen/5.png", pair: false },
    { src: "/img/collections/frozen/6.png", pair: false },
    { src: "/img/collections/frozen/7.png", pair: false },
  ],
  peppa: [
    { src: "/img/collections/peppa/1.png", pair: false },
    { src: "/img/collections/peppa/2.png", pair: false },
    { src: "/img/collections/peppa/3.png", pair: false },
    { src: "/img/collections/peppa/4.png", pair: false },
    { src: "/img/collections/peppa/5.png", pair: false },
    { src: "/img/collections/peppa/6.png", pair: false },
    { src: "/img/collections/peppa/7.png", pair: false },
  ],
  sporitelna: [
    { src: "/img/collections/peppa/1.png", pair: false },
    { src: "/img/collections/peppa/2.png", pair: false },
    { src: "/img/collections/peppa/3.png", pair: false },
    { src: "/img/collections/peppa/4.png", pair: false },
    { src: "/img/collections/peppa/5.png", pair: false },
    { src: "/img/collections/peppa/6.png", pair: false },
    { src: "/img/collections/peppa/7.png", pair: false },
  ],
};

export default function GameBoard() {
  // name of the collection from url
  const collectionName = useParams();
  console.log(collectionName);
  // source of the back of a card
  const collectionsBack = {
    pawPatrol: { src: "/img/collections/paw_patrol/back.png" },
    frozen: { src: "/img/collections/frozen/back.png" },
    peppa: { src: "/img/collections/peppa/back.png" },
    sporitelna: { src: "/img/collections/sporitelna/back.png" },
  };

  // state for cards
  const [cards, setCards] = useState([]);
  const [cardBack, setCardBack] = useState("");
  // state of first and second clicked card
  const [cardFlippedOne, setCardFlippedOne] = useState(null);
  const [cardFlippedTwo, setCardFlippedTwo] = useState(null);
  // if inactive is true, you cannot click the card
  const [inactive, setInactive] = useState(false);

  // setting source of the back of a card
  useEffect(() => {
    setCardBack(collectionsBack[collectionName.collectionName].src);
  }, []);

  console.log(cardBack);

  // function to shuffle the cards
  const shuffleCards = () => {
    // to have pairs - destructure the array of images twice
    const cardsTwice = [
      ...images[collectionName.collectionName],
      ...images[collectionName.collectionName],
    ];
    // shuffling cards, if sort returns greater than 0 returns
    const shuffledCards = cardsTwice
      // shuffle cards
      .sort(() => 0.5 - Math.random())
      // adding unique id to cards
      .map((card) => ({ ...card, id: uuidv4() }));

    resetCardsState();
    setCards(shuffledCards);
  };

  // function to compare clicked cards
  const compareCards = () => {
    // if cards are flipped
    if (
      cardFlippedOne &&
      cardFlippedTwo &&
      cardFlippedOne.id !== cardFlippedTwo.id
    ) {
      setInactive(true);
      // if cards are the same
      if (cardFlippedOne.src === cardFlippedTwo.src) {
        // take the previous state of cards and change the two matching cards property (pair to true), else return card as it was
        setCards((previousCards) => {
          return previousCards.map((card) => {
            if (
              card.src === cardFlippedOne.src &&
              card.src === cardFlippedTwo.src &&
              cardFlippedOne.id !== cardFlippedTwo.id
            ) {
              return { ...card, pair: true };
            } else {
              return card;
            }
          });
        });

        resetCardsState();
      }
      // if cards are different
      if (cardFlippedOne.src !== cardFlippedTwo.src) {
        console.log("cards are different");
        // Wait 2 sec before resetting the cards back
        setTimeout(() => resetCardsState(), 1500);
      }
    }
  };
  // console.log(cards);

  // function to reset the state of the flipped cards
  const resetCardsState = () => {
    setCardFlippedOne(null);
    setCardFlippedTwo(null);
    setInactive(false);
  };

  // if first card is flipped then save the object to cardFlippedTwo, if first card not flipped then save it to cardFlippedOne
  const cardClicked = (card) => {
    if (cardFlippedOne) {
      return setCardFlippedTwo(card);
    } else {
      return setCardFlippedOne(card);
    }
  };
  //   useEffect(() => {
  //   setCount(JSON.parse(window.localStorage.getItem('count')));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('count', count);
  // }, [count]);

  useEffect(() => {
    compareCards();
  }, [cardFlippedOne, cardFlippedTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);
  // console.log(inactive);

  return (
    <div className="board">
      <div className="board__buttons">
        <button
          className="board__btn board__btn_new-game"
          onClick={shuffleCards}
        >
          New Game
        </button>
        <Link to="/" className="board__link-btn">
          <button className="board__btn board__btn_back">
            Choose another collection
          </button>
        </Link>
      </div>
      <div className="card-container">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              cardBack={cardBack}
              key={card.id}
              cardFlippedOne={cardFlippedOne}
              setCardFlippedOne={setCardFlippedOne}
              cardFlippedTwo={cardFlippedTwo}
              setCardFlippedTwo={setCardFlippedTwo}
              flipped={
                card === cardFlippedOne || card === cardFlippedTwo || card.pair
              }
              inactive={inactive}
              cardClicked={cardClicked}
            />
          );
        })}
      </div>
    </div>
  );
}
