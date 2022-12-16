import React from "react";
import { useSelector } from "react-redux";

const GameTable = ({ activeGame }) => {
  const { user } = useSelector((state) => state.auth);

  const isActivePlayer = (player) => {
    const res = { color: "inherit" };
    if (player.userID === user._id.toString()) {
      res.color = "#3FB950";
    }
    return res;
  };

  const isToday = (date) => {
    const res = { color: "inherit" };
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    const dateMidnight = new Date(date);
    if (dateMidnight.getTime() === today.getTime()) {
      res.color = "#3FB950";
    }
    return res;
  };

  return (
    <table className="game-table">
      <thead>
        <tr>
          <th className="date-label">Date</th>
          {activeGame.players.map((player) => {
            return (
              <th key={`${player.username}`} style={isActivePlayer(player)}>
                {player.username}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {activeGame.scoreBoard.map((dailyScores) => {
          return (
            <tr key={`${dailyScores.date.toString()}`}>
              <td className="date-label" style={isToday(dailyScores.date)}>
                {new Date(dailyScores.date).toDateString()}
              </td>
              {activeGame.players.map((player) => {
                const scores = dailyScores.scores;
                const match = scores.find((score) => {
                  return score.userID.toString() === player.userID.toString();
                });
                return (
                  <td key={`${dailyScores.date.toString()}:${player.username}`}>
                    {match ? match.score : 0}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GameTable;
