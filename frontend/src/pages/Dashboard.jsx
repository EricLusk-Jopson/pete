import React from "react";
import GameList from "../components/GameList";
import GameView from "../components/GameView";

function Dashboard() {
  return (
    <div className="dashboard">
      <GameList />
      <GameView />
    </div>
  );
}

export default Dashboard;
