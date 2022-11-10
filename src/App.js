import { useEffect, useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card/Card";

const images = [
  { src: "/img/collections/paw_patrol/1.png" },
  { src: "/img/collections/paw_patrol/2.png" },
  { src: "/img/collections/paw_patrol/3.png" },
  { src: "/img/collections/paw_patrol/4.png" },
  { src: "/img/collections/paw_patrol/5.png" },
  { src: "/img/collections/paw_patrol/6.png" },
  { src: "/img/collections/paw_patrol/7.png" },
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

  useEffect(() => {
    shuffleCards();
    // setCards(cardsTwice);
  }, []);

  console.log(cardFlippedOne);
  console.log(cardFlippedTwo);

  return (
    <div className="card-container">
      {cards.map((card) => {
        const id = uuidv4();
        card.id = id;
        return (
          <Card
            card={card}
            cardBack={cardBack}
            key={card.id}
            cardFlippedOne={cardFlippedOne}
            setCardFlippedOne={setCardFlippedOne}
            cardFlippedTwo={cardFlippedTwo}
            setCardFlippedTwo={setCardFlippedTwo}
          />
        );
      })}
    </div>
  );
}

export default App;
