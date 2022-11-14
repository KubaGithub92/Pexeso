import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card/Card";

const images = [
  { src: "/img/collections/paw_patrol/1.png", pair: false },
  { src: "/img/collections/paw_patrol/2.png", pair: false },
  { src: "/img/collections/paw_patrol/3.png", pair: false },
  { src: "/img/collections/paw_patrol/4.png", pair: false },
  { src: "/img/collections/paw_patrol/5.png", pair: false },
  { src: "/img/collections/paw_patrol/6.png", pair: false },
  { src: "/img/collections/paw_patrol/7.png", pair: false },
];

function App() {
  // state for cards
  const [cards, setCards] = useState([]);
  const [cardBack, setCardBack] = useState(
    "/img/collections/paw_patrol/back.png"
  );
  // state of first and second clicked card
  const [cardFlippedOne, setCardFlippedOne] = useState(null);
  const [cardFlippedTwo, setCardFlippedTwo] = useState(null);
  // if inactive is true, you cannot click the card
  const [inactive, setInactive] = useState(false);

  // to have pairs - destructure the array of images twice
  // const cardsTwice = [...images, ...images];

  // const shuffleCards = () => {
  //   for (let i = cardsTwice.length - 1; i > 0; i--) {
  //     // selecting random cards form the array
  //     const j = Math.floor(Math.random() * (i + 1));

  //     // switching two numbers
  //     const temp = cardsTwice[i];
  //     cardsTwice[i] = cardsTwice[j];
  //     cardsTwice[j] = temp;
  //   }
  // };

  // function to shuffle the cards
  const shuffleCards = () => {
    // to have pairs - destructure the array of images twice
    const cardsTwice = [...images, ...images];
    // shuffling cards, if sort returns greater than 0 returns
    const shuffledCards = cardsTwice
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: uuidv4() }));
    // adding id to cards

    resetCardsState();
    setCards(shuffledCards);
  };

  // function to compare clicked cards
  const compareCards = () => {
    // if cards are flipped
    if (cardFlippedOne && cardFlippedTwo) {
      setInactive(true);
      // if cards are the same
      if (
        cardFlippedOne.src === cardFlippedTwo.src &&
        cardFlippedOne.id !== cardFlippedTwo.id
      ) {
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

  useEffect(() => {
    compareCards();
  }, [cardFlippedOne, cardFlippedTwo]);

  useEffect(() => {
    shuffleCards();
    // setCards(cardsTwice);
  }, []);

  return (
    <>
      <button className="btn__new-game" onClick={shuffleCards}>
        New Game
      </button>
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
    </>
  );
}

export default App;
