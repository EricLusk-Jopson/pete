import React from "react";
import GameList from "../components/GameList";
import GameView from "../components/GameView";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="game-selector">
        <GameList />
      </div>
      <div className="game-view">
        <GameView />
      </div>
    </div>
  );
}

export default Dashboard;
