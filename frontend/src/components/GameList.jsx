import { React, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMany } from "../features/game/gameSlice";
import Filters from "./Filters";
import GameCard from "./GameCard";
import prepareFilters from "../helpers/prepareFilters";

const GameList = () => {
  const isMounted = useRef(false);
  const { games, gamesPerPage, filters } = useSelector((state) => state.games);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMounted.current) {
      const preparedFilters = prepareFilters(filters, user);
      dispatch(getMany({ limit: gamesPerPage, ...preparedFilters }));
    } else {
      isMounted.current = true;
    }
  }, [filters]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      {user && <Filters />}
      <div className="gamelist">
        {games &&
          games.map((game) => {
            return <GameCard game={game} key={game._id} />;
          })}
      </div>
    </div>
  );
};

export default GameList;
