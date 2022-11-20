import { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import GameBoard from "./Pages/GameBoard";

function App() {
  // state for the actual card collection
  const [cardsCollection, setCardsCollection] = useState([]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home setCardsCollection={setCardsCollection} />}
          />
          <Route path="/game/:collectionName" element={<GameBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
