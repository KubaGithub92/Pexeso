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
  const [cardFlippedOne, setCardFlippedOne] = useState(null);
  const [cardFlippedTwo, setCardFlippedTwo] = useState(null);

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
    const shuffledCards = cardsTwice.sort(() => 0.5 - Math.random());
    setCards(shuffledCards);
  };

  // function to compare clicked cards
  const compareCards = () => {
    // if cards are flipped
    if (cardFlippedOne && cardFlippedTwo) {
      // if cards are the same
      if (cardFlippedOne.src === cardFlippedTwo.src) {
        console.log("cards are the same");
        // take the previous state and change the two matching cards property (pair: true)
        setCards((previousCards) => {
          return previousCards.map((card) => {
            if (
              card.src === cardFlippedOne.src &&
              card.src === cardFlippedTwo.src
            ) {
              console.log(card);
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
  console.log(cards);

  // function to reset the state of the flipped cards
  const resetCardsState = () => {
    setCardFlippedOne(null);
    setCardFlippedTwo(null);
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
      <button className="btn__new-game">New Game</button>
      <div className="card-container">
        {cards.map((card) => {
          // const id = uuidv4();
          // card.id = id;
          return (
            <Card
              card={card}
              cardBack={cardBack}
              // key={card.id}
              cardFlippedOne={cardFlippedOne}
              setCardFlippedOne={setCardFlippedOne}
              cardFlippedTwo={cardFlippedTwo}
              setCardFlippedTwo={setCardFlippedTwo}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
