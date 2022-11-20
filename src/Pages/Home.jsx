import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

export default function Home({ setCardsCollection }) {
  const navigate = useNavigate();
  const chooseCollection = (e) => {
    console.log(e.target.dataset.collection);
    setCardsCollection([e.target.dataset.collection]);
    navigate(`/game/${e.target.dataset.collection}`);
  };

  return (
    <>
      <div className="home">
        <h2>Choose your favourite collection and play new game</h2>

        <div className="collection__wrapper">
          <img
            className="collection__wrapper-image"
            src="./img/home-frozen.png"
            alt="collection"
            data-collection="frozen"
            onClick={chooseCollection}
          />
          <img
            className="collection__wrapper-image"
            src="./img/home-patrol.png"
            alt="collection"
            data-collection="pawPatrol"
            onClick={chooseCollection}
          />
          <img
            className="collection__wrapper-image"
            src="./img/home-peppa.png"
            alt="collection"
            data-collection="peppa"
            onClick={chooseCollection}
          />
          <img
            className="collection__wrapper-image"
            src="./img/home-sporitelna.png"
            alt="collection"
            data-collection="sporitelna"
            onClick={chooseCollection}
          />
        </div>
      </div>
    </>
  );
}
