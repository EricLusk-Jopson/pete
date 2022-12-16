import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GameTable from "./GameTable";
import {
  incrementGame,
  joinGame,
  setActiveGame,
  toggleJoinable,
} from "../features/game/gameSlice";
import Spinner from "./Spinner";
import isGameActive from "../helpers/isGameActive";
import isGameFinished from "../helpers/isGameFinished";

const GameView = () => {
  const [isIncrementable, setIsIncrementable] = useState(false);
  const [isFinished, setIsFinished] = useState(true);
  const { isLoading, activeGame } = useSelector((state) => state.games);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(
      "is game incrementable? ",
      isGameActive(activeGame),
      "is game finished? ",
      isGameFinished(activeGame)
    );
    setIsIncrementable(isGameActive(activeGame));
    setIsFinished(isGameFinished(activeGame));
  }, [activeGame]);

  const join = (e) => {
    e.preventDefault();
    const info = { gameID: activeGame._id };
    dispatch(joinGame(info)).then((res) =>
      dispatch(setActiveGame(res.payload))
    );
  };

  const increment = (e) => {
    e.preventDefault();
    console.log("increment button clicked");
    const info = { gameID: activeGame._id };
    dispatch(incrementGame(info)).then((res) =>
      dispatch(setActiveGame(res.payload))
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    const info = { gameID: activeGame._id };
    dispatch(toggleJoinable(info)).then((res) =>
      dispatch(setActiveGame(res.payload))
    );
  };

  return (
    <div className="view">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {activeGame ? (
            <>
              <div className="gameHeaderFlex">
                <div className="gameHeaderDetails">
                  <h2>{activeGame.name}</h2>
                  <p>{activeGame.description}</p>
                </div>
                {user &&
                  activeGame.host.userID.toString() === user._id.toString() && (
                    <div className="gameHeaderJoinable">
                      <span>
                        <p>{`Joinable: ${activeGame.joinable ?? false}`}</p>
                        <button
                          className="filter"
                          name="joinable"
                          onClick={handleClick}
                        >
                          {"(change)"}
                        </button>
                      </span>
                    </div>
                  )}
              </div>

              {user && (
                <>
                  {activeGame.players.find((player) => {
                    return player.userID.toString() === user._id.toString();
                  }) ? (
                    <button onClick={increment} disabled={!isIncrementable}>
                      {activeGame.btnTxt}
                    </button>
                  ) : (
                    <button
                      onClick={join}
                      disabled={isFinished || !activeGame.joinable}
                    >
                      Join Game
                    </button>
                  )}
                </>
              )}

              <div className="table-container">
                <GameTable activeGame={activeGame} />
              </div>
            </>
          ) : (
            <p>Select a game</p>
          )}
        </>
      )}
    </div>
  );
};

export default GameView;
