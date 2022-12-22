import React from "react";
import MobileGameList from "../components/Mobile/MobileGameList";
import GameList from "../components/GameList";
import GameView from "../components/GameView";
import { useIsMobile } from "../contextProviders/useIsMobile";

function Dashboard() {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <div className="dashboard-mobile">
          <MobileGameList />
        </div>
      ) : (
        <div className="dashboard">
          <GameList />
          <GameView />
        </div>
      )}
    </>
  );
}

export default Dashboard;
