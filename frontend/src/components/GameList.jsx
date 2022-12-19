import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMany } from "../features/game/gameSlice";
import Filters from "./Filters";
import GameCard from "./GameCard";
import Spinner from "./Spinner";
import prepareFilters from "../helpers/prepareFilters";

const GameList = () => {
  const { games, gamesPerPage, filters } = useSelector((state) => state.games);
  const { user } = useSelector((state) => state.auth);
  const { isSearchLoading } = useSelector((state) => state.games);
  const dispatch = useDispatch();

  useEffect(() => {
    const preparedFilters = prepareFilters(filters, user);
    dispatch(getMany({ limit: gamesPerPage, ...preparedFilters }));
  }, [filters]);

  return (
    <div
      className="game-selector"
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
        {isSearchLoading ? (
          <Spinner />
        ) : (
          <>
            {games &&
              games.length > 0 &&
              games.map((game) => {
                return <GameCard game={game} key={game._id} />;
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default GameList;
