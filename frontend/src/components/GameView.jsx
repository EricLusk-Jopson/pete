import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
            <table className="game-table">
              <thead>
                <tr>
                  <th>Date</th>
                  {activeGame.players.map((player) => {
                    return <th>{player.username}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {activeGame.scoreBoard.map((dailyScores) => {
                  console.log(dailyScores);
                  return (
                    <tr>
                      <td>{dailyScores.date}</td>
                      {activeGame.players.map((player) => {
                        const scores = dailyScores.scores;
                        const match = scores.find((score) => {
                          return (
                            score.userID.toString() === player.userID.toString()
                          );
                        });
                        return <td>{match ? match.score : 0}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default GameView;
