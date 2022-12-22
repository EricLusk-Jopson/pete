import React from "react";
import { useSelector } from "react-redux";
import { useIsMobile } from "../contextProviders/useIsMobile";

const GameTable = ({ activeGame }) => {
  const isMobile = useIsMobile();
  const { user } = useSelector((state) => state.auth);

  const isActivePlayer = (player) => {
    const res = { color: "inherit" };
    if (user && player.userID === user._id.toString()) {
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

  if (!activeGame || !activeGame.players || activeGame.players.length === 0) {
    return <h2>Please select a game</h2>;
  }
  return (
    <table className="game-table">
      <thead className={`thead-mobile-${isMobile}`}>
        <tr>
          <th className="date-label date-label-header">Date</th>
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
                {isMobile
                  ? new Date(dailyScores.date).toDateString().substring(4, 10)
                  : new Date(dailyScores.date).toDateString()}
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
