import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import GameTable from "./GameTable";

const GameView = () => {
  const [activeGame, setActiveGame] = useState(undefined);
  let location = useLocation();
  const { games } = useSelector((state) => state.games);

  console.log(games);

  useEffect(() => {
    if (!games) {
      return;
    }
    const newActiveGame = games.find(
      (game) => game._id.toString() === location.pathname.substring(1)
    );
    if (newActiveGame) {
      setActiveGame(newActiveGame);
    }
  }, [location.pathname, games]);

  console.log(activeGame);

  return (
    <div className="view">
      {activeGame && (
        <>
          <h2>{activeGame.name}</h2>
          <p>{activeGame.description}</p>
          <button>{activeGame.btnTxt}</button>
          <div className="table-container">
            <GameTable activeGame={activeGame} />
          </div>
        </>
      )}
    </div>
  );
};

export default GameView;
