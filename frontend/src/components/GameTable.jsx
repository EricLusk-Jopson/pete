import React from "react";

const GameTable = ({ activeGame }) => {
  return (
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
                  return score.userID.toString() === player.userID.toString();
                });
                return <td>{match ? match.score : 0}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GameTable;
